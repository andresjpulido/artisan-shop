import {PAYSLIPS_URL } from '../constants/webservices'
import ActionUtility from './utilAction'

export const GET_PAYSLIPS = 'GET_PAYSLIPS';
export const GET_PAYSLIP = 'GET_PAYSLIP';
export const ADD_PAYSLIP = 'ADD_PAYSLIP';

function getPayslips(queryObj){ 
    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_PAYSLIPS, PAYSLIPS_URL, queryObj);
    } 
}

function createPayslip(payslip) { 
    return (dispatch, getState) => {
        ActionUtility.invokeServicePost(dispatch, ADD_PAYSLIP, payslip, PAYSLIPS_URL);
    }
}

export {getPayslips, createPayslip};
