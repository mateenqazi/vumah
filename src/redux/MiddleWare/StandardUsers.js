import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchStandardUsers = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/standardUsers/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetStandardUsers",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetStandardUsers",
                payload: []
            }
        )
    }
}

export const UploadStandardUsers = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/standardUsers/`,
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

export const PatchStandardUsers = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/standardUsers/${id}`,
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

export const GetStandardUser = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/standardUsers/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteStandardUser = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/standardUsers/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}



