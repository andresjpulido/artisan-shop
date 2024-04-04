import {GET_INV_URL, GET_MOV_URL, NEW_MOV_URL} from '../constants/webservices'
import ActionUtility from './utilAction'

export const GET_INVENTORY = 'GET_INVENTORY';
export const GET_MOVEMENT = 'GET_MOVEMENT';
export const CREATE_MOV = 'CREATE_MOV'; 
   
function getAll(queryObj){

    let url = GET_INV_URL

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_INVENTORY, url, queryObj);
    }
 
}
  
function getAllMovements(){

    let url = GET_MOV_URL

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_MOVEMENT, url);
    }
 
}

function newMovement(mov){

    let obj = {
        amount: mov.amount,
        idSize: mov.id_size,
        idProductType: mov.id_productType,
        idOperation:mov.id_operation,
        username:mov.username 
    }

    return (dispatch, getState)=>{
        ActionUtility.invokeServicePost(dispatch, CREATE_MOV, obj, NEW_MOV_URL); 
    }
 
}

export { getAll, getAllMovements, newMovement };

