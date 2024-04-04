import {GET_MOV_URL, REP_MOV_URL} from '../constants/webservices' 
import ActionUtility from './utilAction'

export const GET_MOVEMENT = 'GET_MOVEMENT';
export const WEEKLY_REPORT = 'WEEKLY_REPORT';
    
function getMovements(){

    let url = GET_MOV_URL

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_MOVEMENT, url);
    }
 
} 

function getMovementsByPeriod(date1, date2){

    let url = GET_MOV_URL + "/"+ date1 + "/"+ date2;

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_MOVEMENT, url);
    }
 
} 


function weeklyReport(date1, date2){

    let url = REP_MOV_URL + "/"+ date1 + "/"+ date2;

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, WEEKLY_REPORT, url);
    }
 
} 

export { getMovements, getMovementsByPeriod, weeklyReport };

