import {GET_PAYSLIPS_URL } from '../constants/webservices'
import ActionUtility from './utilAction'

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

    let url = GET_PAYSLIPS_URL;

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_PAYSLIPS, url);
    }
 
}


export {fetchPayslipsSuccess, fetchPayslipsPending, fetchPayslipsError, getPayslips};
