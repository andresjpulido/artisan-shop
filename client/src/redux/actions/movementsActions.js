import axios from 'axios'
import {GET_MOV_URL, REP_MOV_URL} from '../constants/webservices'

export const GET_MOVEMENT = 'GET_MOVEMENT';
export const WEEKLY_REPORT = 'WEEKLY_REPORT';
    
function getMovements(){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_MOV_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {            
            dispatch( { type: GET_MOVEMENT, payload: response.data } ) 
             
        }, (error) => {            
            console.log(error);
                       
        }) 
    }
} 

function getMovementsByPeriod(date1, date2){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(GET_MOV_URL + "/"+ date1 + "/"+ date2,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {            
            dispatch( { type: GET_MOVEMENT, payload: response.data } ) 
             
        }, (error) => {            
            console.log(error);
                       
        }) 
    }
} 


function weeklyReport(date1, date2){

    let token = localStorage.getItem('session')
    
    return (dispatch, getState)=>{
        axios.get(REP_MOV_URL + "/"+ date1 + "/"+ date2,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {            
            dispatch( { type: WEEKLY_REPORT, payload: response.data } ) 
             
        }, (error) => {            
            console.log(error);
                       
        }) 
    }
} 

export { getMovements, getMovementsByPeriod, weeklyReport };

