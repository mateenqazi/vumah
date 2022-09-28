import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchGroups = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/groups/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetGroups",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetGroups",
                payload: []
            }
        )
    }
}

export const UploadGroups = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/groups/`,
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

export const PatchGroups = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/groups/${id}`,
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

export const GetGroup = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/groups/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteGroup = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/groups/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}

const PutGroup = (id) => {}

