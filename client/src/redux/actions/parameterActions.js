import axios from 'axios'
import {GET_PARAMETER_URL} from '../constants/webservices'

export const GET_PARAMETERS = 'GET_PARAMETERS';
    
function getParameters(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_PARAMETER_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            
            dispatch( { type: GET_PARAMETERS, payload: response.data } ) 
             
        }, (error) => {
            
            console.log(error);
                       
        }) 
    }
}
    

export { getParameters };

