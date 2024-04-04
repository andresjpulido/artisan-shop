import {GET_SIZE_URL} from '../constants/webservices' 
import ActionUtility from './utilAction'

export const GET_SIZE = 'GET_SIZE';
    
function getSizes(){

    let url = GET_SIZE_URL;

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_SIZE, url);
    }

/*
    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{

        dispatch( { type: PENDING, payload: null } ) 

        axios.get(GET_SIZE_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {            
            dispatch( { type: GET_SIZE, payload: response.data } ) 
            dispatch( { type: FINISHED, payload: null } )

        }, (error) => {
            
            console.log(error);
                       
        }) 
    }*/
}
    

export { getSizes };

