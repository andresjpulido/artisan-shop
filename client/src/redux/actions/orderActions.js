import axios from 'axios'
import {GET_ORD_OPE_URL } from '../constants/webservices'
import {SHOW_ERRORS} from '../actions/errorActions'
export const GET_ORD_OP = 'GET_ORD_OP';

function getOrders(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_ORD_OPE_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {            
            dispatch( { type: GET_ORD_OP, payload: response.data } ) 
             
        })
        .catch(function (error) {
            dispatch( { type: SHOW_ERRORS, error: error} )
        });
    }
}   


export { getOrders };