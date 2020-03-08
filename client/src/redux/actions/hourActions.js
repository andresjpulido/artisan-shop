import {GET_HOURS_URL, HOUR_URL } from '../constants/webservices'
import ActionUtility from './utilAction'

export const GET_HOURS = "GET_HOURS"
export const ADD_HOUR = "ADD_HOUR"

export const getHours = (username)=>{
     
    let url = GET_HOURS_URL + "/" + username + "/false";

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_HOURS, url);
    }
 
}
 
export const addHour = (hour)=>{ 

    let obj = {
        id_emp: hour.id_emp,
        activity: hour.activity,
        start_date: hour.start_date,
        end_date: hour.end_date,
        amount: hour.amount
    }

    return (dispatch, getState)=>{
        ActionUtility.invokeServicePost(dispatch, ADD_HOUR, obj, HOUR_URL); 
    }
}