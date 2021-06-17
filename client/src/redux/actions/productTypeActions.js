import { PRODUCTTYPE_URL } from '../constants/webservices'
import { PENDING, FINISHED, ALERT } from '../constants/ActionTypes'
import ActionUtility from './utilAction'
import axios from 'axios'

export const GET_PRODUCTTYPE = 'GET_PRODUCTTYPE';
export const GET_PRODUCTTYPES = "GET_PRODUCTTYPES"
export const CREATE_PRODUCTTYPE = 'CREATE_PRODUCTTYPE';
export const DEL_PRODUCTTYPE = 'DEL_PRODUCTTYPE';
export const UPD_PRODUCTTYPE = "UPD_PRODUCTTYPE";

function readAllProductTypes() {
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_PRODUCTTYPES, PRODUCTTYPE_URL);
    }
}

function readOneProductType(id) {
    let url = PRODUCTTYPE_URL + "/" + id
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_PRODUCTTYPE, url);
    }
}

const delProductTypes = (ids) => {

    return (dispatch, getState) => {

        let token = localStorage.getItem('session')

        dispatch({ type: PENDING, payload: null })

        const productTypesObj = {
            ids: ids
        }
        axios.delete(PRODUCTTYPE_URL, {
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
                dispatch(readAllProductTypes());
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

function createProductType(productType) {

    let obj = {
        name: productType.name
    }

    return (dispatch, getState) => {
        ActionUtility.invokeServicePost(dispatch, CREATE_PRODUCTTYPE, obj, PRODUCTTYPE_URL);
    }

}


function updateProductType(productType) {
    return (dispatch, getState) => {
        ActionUtility.invokeServicePUT(dispatch, UPD_PRODUCTTYPE, productType, PRODUCTTYPE_URL);
    }

}

export { readAllProductTypes, createProductType, delProductTypes, readOneProductType, updateProductType };

