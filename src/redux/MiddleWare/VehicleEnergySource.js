import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchVehicleEnergySource = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/vehicleEnergySource/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetVehicleEnergySources",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetVehicleEnergySources",
                payload: []
            }
        )
    }
}

export const UploadVehicleEnergySource = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/vehicleEnergySource/`,
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

export const PatchVehicleEnergySource = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/vehicleEnergySource/${id}`,
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
        const API_URL = `${ROOT_URL}/vehicleEnergySource/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteVehicleCategory = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/vehicleEnergySource/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}



