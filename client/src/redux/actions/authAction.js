import axios from 'axios'
import { SIGNIN_URL } from '../constants/webservices'
import {PENDING, FINISHED, SHOW_ERRORS} from '../constants/ActionTypes'
export const SIGNIN = "SIGNIN"  

export default function signIn (username_, password_){
    
    return (dispatch, getState)=>{

        dispatch( { type: PENDING, payload: null } ) 

        axios.post(SIGNIN_URL,{
            username: username_,
            password: password_
        })
        .then((response) => { 
            dispatch( { type: SIGNIN, payload: response.data } ) 
            dispatch( { type: FINISHED, payload: null } )

        }, (error) => { 
            dispatch( { type: SHOW_ERRORS, error: { message :"Error" }} ) 
            dispatch( { type: FINISHED, payload: null } )
                  
        }) 
    }
}