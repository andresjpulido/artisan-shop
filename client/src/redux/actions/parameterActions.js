import axios from 'axios'
import {GET_PARAMETER_URL} from '../constants/webservices' 
import {PENDING, FINISHED} from '../constants/ActionTypes'

export const GET_PARAMETERS = 'GET_PARAMETERS';
    
function getParameters(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        
        dispatch( { type: PENDING, payload: null } ) 

        axios.get(GET_PARAMETER_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            
            dispatch( { type: GET_PARAMETERS, payload: response.data } ) 
            dispatch( { type: FINISHED, payload: null } ) 
             
        }, (error) => {
            
            console.log(error);
                       
        }) 
    }
}
    

export { getParameters };

