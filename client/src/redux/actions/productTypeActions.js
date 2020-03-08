import {GET_PRODUCTTYPE_URL } from '../constants/webservices'
import ActionUtility from './utilAction'

export const GET_PRODUCTTYPE = 'GET_PRODUCTTYPE';
export const CREATE_PRODUCTTYPE = 'CREATE_PRODUCTTYPE';
    
function getProductTypes(){

    let url = GET_PRODUCTTYPE_URL;

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_PRODUCTTYPE, url);
    }
 
}
   
function create(productType){

    let obj = {
        name: productType.name
    }

    return (dispatch, getState)=>{
        ActionUtility.invokeServicePost(dispatch, CREATE_PRODUCTTYPE, obj, GET_PRODUCTTYPE_URL); 
    }
 
}

export { getProductTypes, create };

