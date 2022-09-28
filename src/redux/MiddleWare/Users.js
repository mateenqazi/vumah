import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchUsers = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/users/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetUsers",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetUsers",
                payload: []
            }
        )
    }
}

export const UploadUsers = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/users/`,
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

export const PatchUsers = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/users/${id}`,
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

export const GetUser = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/users/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteUser = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/users/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}



