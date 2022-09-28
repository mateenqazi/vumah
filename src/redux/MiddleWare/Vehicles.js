import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const UploadVehicle = (file, Data) => async (dispatch, getState) => {

    try {
        axios({
            method: 'POST',
            url: `${ROOT_URL}/vehicle/`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
            data: Data
        })
    } catch (err) {
        alert(err.message);
    }

};

export const FetchVehicles = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/vehicle/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetVehicles",
                payload: response.data
            }
        )
    } catch (e) {
        dispatch(
            {
                type: "SetVehicles",
                payload: []
            }
        )
    }

}

export const PatchVehicle = (id, data) => async (dispatch, getState) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/vehicle/${id}`,
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

export const DeleteVehicle = (id) => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/vehicle${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        return undefined
    }

}

export const DeleteByRegVehicle = (reg) => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/vehicle//vehicle/deleteByReg`;
        return  await axios.get(API_URL)
    } catch (e) {
        return undefined
    }

}


