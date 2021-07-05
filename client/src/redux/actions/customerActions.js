import {CUSTOMERS_URL} from '../constants/webservices'
import ActionUtility from './utilAction' 

export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const GET_CUSTOMER = 'GET_CUSTOMER';
export const NEW_CUSTOMER = 'NEW_CUSTOMER';

function readAllCustomer(queryObj){

    let url = CUSTOMERS_URL;

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_CUSTOMERS, url, queryObj);
    }
 
}   


function getCustomer(id, idStatus){

    let url = CUSTOMERS_URL+"/"+id;

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_CUSTOMER, url);
    }
 
}  

function createCustomer(requestObj){
    let url = CUSTOMERS_URL;
    
    return (dispatch, getState)=>{
        ActionUtility.invokeServicePost(dispatch, CREATE_CUSTOMER, requestObj, url);
    }
}

function updateCustomer(requestObj){
    let url = CUSTOMERS_URL;
    
    return (dispatch, getState)=>{
        ActionUtility.invokeServicePUT(dispatch, UPDATE_CUSTOMER, requestObj, url);
    }
}

export { readAllCustomer, getCustomer, createCustomer, updateCustomer };