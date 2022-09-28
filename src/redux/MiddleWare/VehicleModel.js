import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchVehicleModel = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/vehicleModel/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetVehicleModel",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetVehicleModel",
                payload: []
            }
        )
    }
}

export const UploadVehicleModel = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/vehicleModel/`,
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

export const PatchVehicleModel = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/vehicleModel/${id}`,
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

export const GetVehicleModel = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/vehicleModel/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        return undefined
    }

}

export const DeleteVehicleModel = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/vehicleModel/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        return undefined
    }

}



