import {USER_URL} from '../constants/webservices'
import ActionUtility from './utilAction' 

export const GET_USERS = 'GET_USERS';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_USER = 'GET_USER';
export const NEW_USER = 'NEW_USER';
export const UPD_USER = 'UPD_USER';
export const UPDATE_PWD = 'UPDATE_PWD';

function getUsers(){
    let url = USER_URL;
    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_USERS, url);
    } 
}   

function getUser(id){
    let url = USER_URL+"/"+id;
    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_USER, url);
    } 
}  

function createUser(requestObj){
    let url = USER_URL;    
    return (dispatch, getState)=>{
        ActionUtility.invokeServicePost(dispatch, CREATE_USER, requestObj, url);
    }
}

function updateUser(requestObj){
    let url = USER_URL;    
    return (dispatch, getState)=>{
        ActionUtility.invokeServicePUT(dispatch, UPDATE_USER, requestObj, url);
    }
}

function deleteUser(id){
    let url = USER_URL+"/"+id;
    return (dispatch, getState)=>{
        ActionUtility.invokeServiceDelete(dispatch, GET_USER, url);
    } 
} 

function updatePassword(requestObj){
    let url = USER_URL+"/"+requestObj.id+"/password";    
    return (dispatch, getState)=>{
        ActionUtility.invokeServicePUT(dispatch, UPDATE_PWD, requestObj, url);
    }
}

export { getUsers, getUser, createUser, updateUser, deleteUser, updatePassword };