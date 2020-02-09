import axios from 'axios'
import {GET_OPERATION_URL} from '../constants/webservices'

export const GET_OPERATION = 'GET_OPERATION';
    
function getAllOperations(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_OPERATION_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            
            dispatch( { type: GET_OPERATION, payload: response.data } ) 
             
        }, (error) => {
            
            console.log(error);
                       
        }) 
    }
}
    

export { getAllOperations };

