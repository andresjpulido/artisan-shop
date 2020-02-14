import axios from 'axios'
import {GET_PRODUCTTYPE_URL } from '../constants/webservices'

export const GET_PRODUCTTYPE = 'GET_PRODUCTTYPE';
export const CREATE_PRODUCTTYPE = 'CREATE_PRODUCTTYPE';
    
function getProductTypes(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_PRODUCTTYPE_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            
            dispatch( { type: GET_PRODUCTTYPE, payload: response.data } ) 
             
        }, (error) => {
            
            console.log(error);
                       
        }) 
    }
}
   
function create(productType){
    let token = localStorage.getItem('session')
    console.log("create method", productType)
    const qs = require('qs');

    return (dispatch, getState)=>{
        axios.post(GET_PRODUCTTYPE_URL,qs.stringify({
            name: productType.name
        }),
        {
            headers: {
                'Authorization': 'Bearer ' + token,               
                'content-type': 'application/x-www-form-urlencoded'
            }
            
        })
        .then((response) => {             
            dispatch( { type: CREATE_PRODUCTTYPE, payload: response.data } ) 
             
        }, (error) => {
            //dispatch( { type: SIGNIN, payload: error } ) 
            console.log(error);
                       
        }) 
    }
}

export { getProductTypes, create };

