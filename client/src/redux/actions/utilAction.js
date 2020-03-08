import axios from 'axios'
import { PENDING, FINISHED, SHOW_ERRORS } from '../constants/ActionTypes'

class ActionUtility {

  static invokeServicePost(dispatch, actionType, requestObj, url) {

    let token = localStorage.getItem('session')
    const qs = require('qs'); 
    
    dispatch({ type: PENDING, payload: null })

    axios.post(url, qs.stringify(requestObj), {
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/x-www-form-urlencoded'
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


  static invokeServiceGet(dispatch, actionType, url) {
    
    let token = localStorage.getItem('session')
 
    dispatch({ type: PENDING, payload: null })

    axios.get(url, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
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