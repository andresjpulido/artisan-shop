import { LOCATIONS_URL } from '../constants/webservices';
import { PENDING, FINISHED, ALERT } from '../constants/ActionTypes';
import axios from 'axios';
import ActionUtility from './utilAction';

export const GET_LOCATIONS = 'GET_LOCATIONS';
export const NEW_LOCATION = 'NEW_LOCATION';
export const GET_LOCATION = 'GET_LOCATION';
export const UPD_LOCATION = 'UPD_LOCATION';
export const ADD_LOCATION = 'ADD_LOCATION';

function readAllLocations(queryObj) {    
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_LOCATIONS, LOCATIONS_URL, queryObj);
    }
}

function readOneLocation(id) {
    let url = LOCATIONS_URL + "/" + id
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_LOCATION, url);
    }
}

function createLocation(location) {

    return (dispatch, getState) => {
        ActionUtility.invokeServicePost(dispatch, ADD_LOCATION, location, LOCATIONS_URL);
    }
}

function deleteLocation(ids) {

    return (dispatch, getState) => {

        let token = localStorage.getItem('session')

        dispatch({ type: PENDING, payload: null })

        const productTypesObj = {
            ids: ids
        }
        axios.delete(LOCATIONS_URL, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'content-type': 'application/json'
            },
            data: productTypesObj
        })

            .then((response) => {
                dispatch({
                    type: ALERT, payload: {
                        type: "SUCCESS",
                        description: "Your request has been successfully processed."
                    }
                })
                dispatch(readAllLocations());
            })

            .catch(function (error) {

                if (error.response) {

                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    if (error.response.data) {

                        dispatch({
                            type: ALERT, payload: {
                                type: "ERROR",
                                description: error.response.data.message
                            }
                        })
                        dispatch({ type: FINISHED, payload: null })

                    }

                } else if (error.request) {
                    dispatch({
                        type: ALERT, payload: {
                            type: "ERROR",
                            description: error.request
                        }
                    })

                } else {
                    dispatch({
                        type: ALERT, payload: {
                            type: "ERROR",
                            description: error.message
                        }
                    })

                }

                console.log(error.config);

                if (!error.response) {
                    dispatch({
                        type: ALERT, payload: {
                            type: "ERROR",
                            description: "No connection with the server."
                        }
                    })
                    dispatch({ type: FINISHED, payload: null })
                }

            })
    }
}

function updateLocation(location) {
    return (dispatch, getState) => {
        ActionUtility.invokeServicePUT(dispatch, UPD_LOCATION, location, LOCATIONS_URL);
    }
}

export { readAllLocations, createLocation, readOneLocation, deleteLocation, updateLocation };

