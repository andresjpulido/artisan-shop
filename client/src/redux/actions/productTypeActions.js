import axios from 'axios'
import {GET_PRODUCTTYPE_URL} from '../constants/webservices'

export const GET_PRODUCTTYPE = 'GET_PRODUCTTYPE';
    
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
    

export { getProductTypes };

