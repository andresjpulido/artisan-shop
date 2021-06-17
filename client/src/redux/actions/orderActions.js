import { ORDER_URL } from '../constants/webservices'
import ActionUtility from './utilAction'
import { createImageOrder } from './imageActions'

import axios from 'axios'
import { PENDING, FINISHED, SHOW_ERRORS } from '../constants/ActionTypes'

export const GET_ORD_OP = 'GET_ORD_OP';
export const CREATE_ORDER = 'CREATE_ORDER';
export const GET_ORDER = 'GET_ORDER';
export const UPD_ORDER = 'UPD_ORDER'


function getOrders() {

    let url = ORDER_URL;

    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_ORD_OP, url);
    }

}


function getOrder(id, idStatus) {

    let url = ORDER_URL + "/" + id;

    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_ORDER, url);
    }

}

function createOrder(requestObj) {
    let url = ORDER_URL;

    // return (dispatch, getState)=>{
    //     ActionUtility.invokeServicePost(dispatch, CREATE_ORDER, requestObj, url);
    // }

    return (dispatch, getState) => {

        let token = localStorage.getItem('session')


        dispatch({ type: PENDING, payload: null })

        axios.post(url, requestObj, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'content-type': 'application/json'
            }
        })

            .then((response) => {

                dispatch({ type: CREATE_ORDER, payload: response.data })

                //TODO recorrer la respuesta y por cada imagen invocar la actualizacion de la imagen en la base de datos y luego actualizar la orden en redux
                console.log("response: ", response)

                const order = response.data;

                for (var i = 0; i < order.products.length; i++){
                    for (var j = 0; j < order.products[i].images.length; j++){
                        
                        const newImage = order.products[i].images[j];
                        const oldImage = requestObj.products[i].images[j];

                        console.log("updating ", newImage)
                        const formData = new FormData();
                        formData.append('file', oldImage.file);
                        //formData.append('id_product', newImage.id_product)
                        formData.append('id', newImage.id);

                        console.log("updating  data ", newImage.id)
                        const o = dispatch(createImageOrder(order, formData));
                        console.log("actualizando la orden creada. Colocando la URL : " + o)


                    }

                }

                   

                dispatch({ type: FINISHED, payload: null })
            })

            .catch(function (error) {

                console.log(error)

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

function getOpenedOrders() {

    let url = ORDER_URL + "?status=opened";

    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_ORD_OP, url);
    }

}

function getOrdersByStatus(id) {

    let url = ORDER_URL + "?status=" + id;

    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_ORD_OP, url);
    }

}

export { getOrders, createOrder, getOrder, getOpenedOrders, getOrdersByStatus };