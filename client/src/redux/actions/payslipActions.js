 
import axios from 'axios'

import {GET_PAYSLIPS_URL } from '../constants/webservices'

export const FETCH_PAYSLIPS_PENDING = 'FETCH_PAYSLIPS_PENDING';
export const FETCH_PAYSLIPS_SUCCESS = 'FETCH_PAYSLIPS_SUCCESS';
export const FETCH_PAYSLIPS_ERROR = 'FETCH_PAYSLIPS_ERROR';
export const GET_PAYSLIPS = 'GET_PAYSLIPS';

function fetchPayslipsPending() {
    return {
        type: FETCH_PAYSLIPS_PENDING
    }
}

function fetchPayslipsSuccess(payslips) {
    console.log("payslips",payslips)
    return {
        type: FETCH_PAYSLIPS_SUCCESS, 
        payload :{ payslips }
    }
}

function fetchPayslipsError(error) {
    return {
        type: FETCH_PAYSLIPS_ERROR,
        error: error
    }
}
  
function getPayslips(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_PAYSLIPS_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            console.log("se ha invocado el servicio de payslips", response.data)
            dispatch( { type: GET_PAYSLIPS, payload: response.data } ) 
             
        }, (error) => {
            //dispatch( { type: SIGNIN, payload: error } ) 
            console.log(error);
                       
        }) 
    }
}


export {fetchPayslipsSuccess, fetchPayslipsPending, fetchPayslipsError, getPayslips};
