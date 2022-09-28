import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchVehicleFeatures = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/vehicleFeatures/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetVehicleFeatures",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetVehicleFeatures",
                payload: []
            }
        )
    }
}

export const UploadVehicleFeatures = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/vehicleFeatures/`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
            data: Data
        })
    } catch (err) {
        alert(err.message);
        return undefined
    }

};

export const PatchVehicleFeatures = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/vehicleFeatures/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
            data: Data
        })

        return response.data
    } catch (err) {
        alert(err.message);
        return undefined
    }

}

export const GetVehicleFeature = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/vehicleFeatures/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteVehicleFeature = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/vehicleFeatures/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}



