import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchVehicleManufacturers = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/vehicleManufacturers/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetVehicleManufacturers",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetVehicleManufacturers",
                payload: []
            }
        )
    }
}

export const UploadVehicleManufacturers = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/vehicleManufacturers/`,
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

export const PatchVehicleManufacturers = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/vehicleManufacturers/${id}`,
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

export const GetVehicleManufacturers = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/vehicleManufacturers/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteVehicleManufacturers = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/vehicleManufacturers/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}



