import { PRODUCTS_URL } from '../constants/webservices';
import { PENDING, FINISHED, ALERT } from '../constants/ActionTypes';
import axios from 'axios';
import ActionUtility from './utilAction';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const UPD_PRODUCT = 'UPD_PRODUCT';
export const NEW_PRODUCT = 'NEW_PRODUCT';
 
function readAllProduct(queryObj) {    
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_PRODUCTS, PRODUCTS_URL, queryObj);
    }
}

function readOneProduct(id) {
    let url = PRODUCTS_URL + "/" + id
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_PRODUCT, url);
    }
}

function createProduct(productObj) {
    return (dispatch, getState) => {
        ActionUtility.invokeServicePost(dispatch, ADD_PRODUCT, productObj, PRODUCTS_URL);
    }
}

function deleteProduct(ids) {

    return (dispatch, getState) => {

        let token = localStorage.getItem('session')

        dispatch({ type: PENDING, payload: null })

        const productObj = {
            ids: ids
        }
        axios.delete(PRODUCTS_URL, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'content-type': 'application/json'
            },
            data: productObj
        })

            .then((response) => {
                dispatch({
                    type: ALERT, payload: {
                        type: "SUCCESS",
                        description: "Your request has been successfully processed."
                    }
                })
                dispatch(readAllProduct());
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

function updateProduct(productObj) {
    return (dispatch, getState) => {
        ActionUtility.invokeServicePUT(dispatch, UPD_PRODUCT, productObj, PRODUCTS_URL);
    }
}

export { readAllProduct, createProduct, readOneProduct, deleteProduct, updateProduct };

