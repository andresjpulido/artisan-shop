import {GET_ORD_OPE_URL } from '../constants/webservices'
import ActionUtility from './utilAction' 

export const GET_ORD_OP = 'GET_ORD_OP';

function getOrders(){

    let url = GET_ORD_OPE_URL;

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_ORD_OP, url);
    }
 
}   


export { getOrders };