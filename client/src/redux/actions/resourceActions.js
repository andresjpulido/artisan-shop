import {RESOURCE_URL} from '../constants/webservices'
import ActionUtility from './utilAction' 

export const GET_RESOURCES = 'GET_RESOURCES'; 

function getResources(){
    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_RESOURCES, RESOURCE_URL);
    } 
}   
 

export { getResources };