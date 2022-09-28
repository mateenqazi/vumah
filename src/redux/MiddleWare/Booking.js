import axios from "axios";

import {ROOT_URL} from '../services/rootUrl'
import {getToken} from "../../utils/jwt";

export const FetchBookings = () => async (dispatch, getState) => {

    try {
        const API_URL = `${ROOT_URL}/booking/`;
        const response = await axios.get(API_URL)
        dispatch(
            {
                type: "SetBooking",
                payload: response.data
            }
        )
    } catch (e) {
        
        dispatch(
            {
                type: "SetBooking",
                payload: []
            }
        )
    }
}

export const UploadBooking = async (file, Data) => {

    try {
        return await axios({
            method: 'POST',
            url: `${ROOT_URL}/booking/`,
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

export const PatchBooking = async (id, data) => {

    try {
        const response = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/booking/${id}`,
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

export const GetBooking = async (id) => {

    try {
        const API_URL = `${ROOT_URL}/booking/${id}/`;
        return  await axios.get(API_URL)
    } catch (e) {
        
        return undefined
    }

}

export const DeleteBooking = async (id) => {

    try {
        return await axios({
            method: 'DELETE',
            url: `${ROOT_URL}/booking/${id}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
        })
    } catch (e) {
        
        return undefined
    }

}

export const PostBreakdownReport = (id) => {}
export const PostCheckIn = (id) => {}
export const PostCheckOut = (id) => {}
export const PostEdit = (id) => {}
export const PostHostForceCheckOut = (id) => {}

