import axios from 'axios'
import { PENDING, FINISHED, SHOW_ERRORS, ALERT, REDIRECT } from '../constants/ActionTypes'
import { UPD_ORDER } from '../actions/orderActions';

class ActionUtility {

  static invokeServicePost(dispatch, actionType, requestObj, url) {

    let token = localStorage.getItem('session')
    //const qs = require('qs'); 
    dispatch({ type: PENDING, payload: null })

    axios.post(url, requestObj, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
      }
    })

      .then((response) => {

        dispatch({ type: actionType, payload: response.data })
        dispatch({
          type: ALERT, payload: {
            type: "SUCCESS",
            description: "Your request has been successfully processed"
          }
        })

        dispatch({ type: FINISHED, payload: null })
        dispatch({ type: REDIRECT, payload: "/home" })
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
            dispatch({ type: ALERT, payload: { type: "ERROR", description: error.response.data.message } })
          }

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
          dispatch({ type: ALERT, payload: { type: "ERROR", description: "No connection with the server." } })

        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch({ type: ALERT, payload: { type: "ERROR", description: error.message } });
        }

        console.log(error.config);

        if (!error.response) {
          dispatch({ type: ALERT, payload: { type: "ERROR", description: "No connection with the server." } })
        }

        dispatch({ type: FINISHED, payload: null })
      })

  }


  static invokeServiceGet(dispatch, actionType, url, queryObj) {

    let token = localStorage.getItem('session')

    dispatch({ type: PENDING, payload: null })

    axios.get(url, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: queryObj

    })

      .then((response) => {
        dispatch({ type: actionType, payload: response.data })
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
            dispatch({ type: ALERT, payload: { type: "ERROR", description: error.response.data.message } })
            dispatch({ type: FINISHED, payload: null })

          }

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js  
          dispatch({ type: ALERT, payload: { type: "ERROR", description: error.request } })
          
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }

        console.log(error.config);

        if (!error.response) {
          dispatch({ type: ALERT, payload: { type: "ERROR", description: "No connection with the server." } })
          dispatch({ type: FINISHED, payload: null })
        }

      })

  }



  static invokeServicePUT(dispatch, actionType, requestObj, url) {

    let token = localStorage.getItem('session')
    const qs = require('qs');
    const params = qs.stringify(requestObj);

    console.log("params ", params, requestObj)

    dispatch({ type: PENDING, payload: null })

    axios.put(url, requestObj, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
      }
    })

      .then((response) => {
        //dispatch({ type: actionType, payload: response.data })
        dispatch({ type: ALERT, payload: { type: "SUCCESS", description: "Your request has been successfully processed" } })
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
            dispatch({ type: ALERT, payload: { type: "ERROR", description: error.response.data.message } })
            dispatch({ type: FINISHED, payload: null })

          }

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js

          dispatch({ type: ALERT, payload: { type: "ERROR", description: error.request } })
        } else {
          // Something happened in setting up the request that triggered an Error

          dispatch({ type: ALERT, payload: { type: "ERROR", description: error.message } })
        }

        console.log(error.config);

        if (!error.response) {
          dispatch({ type: ALERT, payload: { type: "ERROR", description: "No connection with the server." } })
          dispatch({ type: FINISHED, payload: null })
        }

      })

  }



  static invokeServicePostFormData(dispatch, actionType, requestObj, url, order) {

    let token = localStorage.getItem('session')
    //const qs = require('qs'); 

    dispatch({ type: PENDING, payload: null })

    axios.put(url, requestObj, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      }
    })

      .then((response) => {
        console.log(response)

        //update order image
        for (var i = 0; i < order.products.length; i++) {
          for (var j = 0; j < order.products[i].images.length; j++) {

            if (order.products[i].images[j].id === response.data.id) {
              order.products[i].images[j].url = response.data.url
              order.products[i].images[j].file = null;
              console.log("updating url ", response.data.id, response.data.url)
            }


          }

        }


        dispatch({ type: UPD_ORDER, payload: { ...order, products: order.products } })
        //dispatch({ type: FINISHED, payload: null })
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


  static invokeServiceDelete(dispatch, actionType, url) {

    let token = localStorage.getItem('session')
    //const qs = require('qs'); 

    dispatch({ type: PENDING, payload: null })

    axios.delete(url, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
      }
    })

      .then((response) => {
        dispatch({ type: actionType, payload: response.data })
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

export default ActionUtility;