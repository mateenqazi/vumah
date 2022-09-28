import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchBreakdownReasons = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/breakdownReasons/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetBreakdownReasons",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetBreakdownReasons",
                payload: []
            }
        )
    }
}

export const UploadBreakdownReason = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/breakdownReasons/`,
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

export const PatchBreakdownReason = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/breakdownReasons/${id}`,
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

export const GetBreakdownReason = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/breakdownReasons/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteBreakdownReason = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/breakdownReasons/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}



