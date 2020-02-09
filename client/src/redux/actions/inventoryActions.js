import axios from 'axios'
import {GET_INV_URL, GET_MOV_URL, NEW_MOV_URL} from '../constants/webservices'

export const GET_INVENTORY = 'GET_INVENTORY';

export const GET_MOVEMENT = 'GET_MOVEMENT';

export const CREATE_MOV = 'CREATE_MOV';
export const SHOW_ERRORS = 'SHOW_ERRORS';
   
function getAll(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_INV_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            console.log("Inventory:::",response.data)
            dispatch( { type: GET_INVENTORY, payload: response.data } ) 
             
        }, (error) => {
            //dispatch( { type: SIGNIN, payload: error } ) 
            console.log(error);
                       
        }) 
    }
}
  
function getAllMovements(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_MOV_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            console.log("Inventory:::",response.data)
            dispatch( { type: GET_MOVEMENT, payload: response.data } ) 
             
        }, (error) => {
            //dispatch( { type: SIGNIN, payload: error } ) 
            console.log(error);
                       
        }) 
    }
}

function newMovement(mov){

    let token = localStorage.getItem('session')
    console.log("movement " , mov)
    const qs = require('qs');

    return (dispatch, getState)=>{
        axios.post(NEW_MOV_URL,qs.stringify({
            amount: mov.amount,
            idSize: mov.id_size,
            idProductType: mov.id_productType,
            idOperation:mov.id_operation,
            username:mov.username 
        }),
        {
            headers: {
                'Authorization': 'Bearer ' + token,               
                'content-type': 'application/x-www-form-urlencoded'
            }
            
        })
        .then((response) => {
            console.log("Employees:::",response.data)
            dispatch( { type: CREATE_MOV, payload: response.data } ) 
             
        }, (error) => {
            console.log(error);
            dispatch( { type: SHOW_ERRORS, error: error} )             
                       
        }) 
    }
}

export { getAll, getAllMovements, newMovement };

