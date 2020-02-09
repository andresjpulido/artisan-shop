import axios from 'axios'
import { SIGNIN_URL } from '../constants/webservices'

export const SIGNIN = "SIGNIN" 
export const SIGNIN_ERROR = "SIGNIN_ERROR"

export default function signIn (username_, password_){
    
    return (dispatch, getState)=>{
        axios.post(SIGNIN_URL,{
            username: username_,
            password: password_
        })
        .then((response) => { 
            dispatch( { type: SIGNIN, payload: response.data } ) 
             
        }, (error) => { 
            dispatch( { type: SIGNIN_ERROR, error: { message :"Error" }} ) 
                  
        }) 
    }
}