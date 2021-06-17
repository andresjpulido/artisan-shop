import {ROL_URL} from '../constants/webservices'
import ActionUtility from './utilAction' 

export const GET_ROLES = 'GET_ROLES';
export const CREATE_ROL = 'CREATE_ROL';
export const UPDATE_ROL = 'UPDATE_ROL';
export const DELETE_ROL = 'DELETE_ROL';
export const GET_ROL = 'GET_ROL';
export const NEW_ROL = 'NEW_ROL';
export const UPD_ROL = 'UPD_ROL';

function getRoles(){
    let url = ROL_URL;
    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_ROLES, url);
    } 
}   

function getRol(id){
    let url = ROL_URL+"/"+id;
    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, GET_ROL, url);
    } 
}  

function createRol(requestObj){
    let url = ROL_URL;    
    return (dispatch, getState)=>{
        ActionUtility.invokeServicePost(dispatch, CREATE_ROL, requestObj, url);
    }
}

function updateRol(requestObj){
    let url = ROL_URL;    
    return (dispatch, getState)=>{
        ActionUtility.invokeServicePUT(dispatch, UPDATE_ROL, requestObj, url);
    }
}

function deleteRoles(id){
    let url = ROL_URL+"/"+id;
    return (dispatch, getState)=>{
        ActionUtility.invokeServiceDelete(dispatch, GET_ROL, url);
    } 
} 

export { getRoles, getRol, createRol, updateRol, deleteRoles };