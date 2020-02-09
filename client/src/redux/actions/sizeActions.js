import axios from 'axios'
import {GET_SIZE_URL} from '../constants/webservices'

export const GET_SIZE = 'GET_SIZE';
    
function getSizes(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_SIZE_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            
            dispatch( { type: GET_SIZE, payload: response.data } ) 
             
        }, (error) => {
            
            console.log(error);
                       
        }) 
    }
}
    

export { getSizes };

