import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchVehicleCategories = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/vehicleCategories/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetVehicleCategories",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetVehicleCategories",
                payload: []
            }
        )
    }
}

export const UploadVehicleCategories = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/vehicleCategories/`,
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

export const PatchVehicleCategories = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/vehicleCategories/${id}`,
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

export const GetVehicleCategory = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/vehicleCategories/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteVehicleCategory = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/vehicleCategories/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}



