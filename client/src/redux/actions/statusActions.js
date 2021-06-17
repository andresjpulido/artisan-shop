import {STATUS_URL} from '../constants/webservices'
import ActionUtility from './utilAction' 

export const GET_STATUS = 'GET_STATUS';


function getStatusList(){

    let url = STATUS_URL;

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_STATUS, url);
    }
 
}   




export { getStatusList };