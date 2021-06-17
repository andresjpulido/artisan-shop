import { HOUR_URL } from '../constants/webservices'
import ActionUtility from './utilAction'
import axios from 'axios'
import { PENDING, FINISHED, SHOW_ERRORS } from '../constants/ActionTypes'

export const UPD_HOUR = "UPD_HOUR"
export const GET_HOURS = "GET_HOURS"
export const GET_HOUR = "GET_HOUR"
export const ADD_HOUR = "ADD_HOUR"
export const DEL_HOUR = "DEL_HOUR"
export const NEW_HOUR = "NEW_HOUR"

export const getHours = (queryObj) => {
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_HOURS, HOUR_URL, queryObj);
    }
}

export const getHour = (id) => {

    let url = HOUR_URL + "/" + id;

    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_HOUR, url);
    }

}


export const delHour = (ids, username) => {
    let url = HOUR_URL + "/collection";
    return (dispatch, getState) => {
        ActionUtility.invokeServiceDelete(dispatch, DEL_HOUR, url);
    }
}

export const delHours = (ids, username) => {
    let url = HOUR_URL;

    return (dispatch, getState) => {

        let token = localStorage.getItem('session')

        dispatch({ type: PENDING, payload: null })

        const hourObj = {
            ids: ids,
            username: username
        }
        axios.delete(url, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'content-type': 'application/json'
            },
            data: hourObj
        })

            .then((response) => {
                console.log(response.data)
                dispatch(getHours(username));
            })

            .catch(function (error) {

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    if (error.response.data) {
                        dispatch({ type: SHOW_ERRORS, error: { message: error.response.data.message } })
                        dispatch({ type: FINISHED, payload: null })

                    }

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);

                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

                console.log(error.config);

                if (!error.response) {
                    dispatch({ type: SHOW_ERRORS, error: { message: "No connection with the server." } })
                    dispatch({ type: FINISHED, payload: null })
                }

            })


    }
}

export const addHour = (hour) => {

    let hourobj = {
        id_emp: hour.id_emp,
        activity: hour.activity,
        start_date: hour.start_date,
        amount: hour.amount
    }

    return (dispatch, getState) => {
        ActionUtility.invokeServicePost(dispatch, ADD_HOUR, hourobj, HOUR_URL);
    }
}