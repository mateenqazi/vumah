import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchBookingChangeRequests = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/bookingChangeRequests/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetBookingChangeRequests",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetBookingChangeRequests",
                payload: []
            }
        )
    }
}

export const UploadBookingChangeRequests = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/bookingChangeRequests/`,
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

export const PatchBookingChangeRequests = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/bookingChangeRequests/${id}`,
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

export const GetBookingChangeRequest = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/bookingChangeRequests/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteBookingChangeRequest = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/bookingChangeRequests/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}



