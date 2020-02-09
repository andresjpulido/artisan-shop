import axios from 'axios'

import {GET_HOURS_URL, HOUR_URL } from '../constants/webservices'

export const GET_HOURS = "GET_HOURS"
export const ADD_HOUR = "ADD_HOUR"

export const getHours = (username)=>{
    
    let token = localStorage.getItem('session')
    console.log("URL " + GET_HOURS_URL + "/" + username + "/false")
    
    return (dispatch, getState)=>{
        axios.get(GET_HOURS_URL + "/" + username + "/false",{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            console.log("recibiendo resPuesta de servicio getHours ",response.data)
            dispatch( { type: GET_HOURS, payload: response.data } ) 
             
        }, (error) => {
            //dispatch( { type: SIGNIN, payload: error } ) 
            console.log(error);
                       
        }) 
    }
}
 
export const addHour = (hour)=>{
    console.log("insertando ", hour)
    return (dispatch, getState)=>{
        axios.post(HOUR_URL,{
            id_emp: hour.id_emp,
            activity: hour.activity,
            start_date: hour.start_date,
            end_date: hour.end_date,
            amount: hour.amount
        })
        .then((response) => {
            console.log("recibiendo respuesta de servicio addHour ", response.data)
            dispatch( { type: ADD_HOUR, payload: response.data } ) 
             
        }, (error) => {
            //dispatch( { type: SIGNIN, payload: error } ) 
            console.log(error);
                       
        }) 
    }
}