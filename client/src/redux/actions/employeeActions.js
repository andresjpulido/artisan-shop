 
import {GET_EMP_URL, NEW_EMP_URL } from '../constants/webservices'
import {PENDING, FINISHED, SHOW_ERRORS} from '../constants/ActionTypes'

import ActionUtility from './utilAction'

export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const FETCH_EMPLOYEES_PENDING = 'FETCH_EMPLOYEES_PENDING';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_ERROR = 'FETCH_EMPLOYEES_ERROR';
export const CREATE_EMP = 'CREATE_EMP';
export const GET_EMPLOYEE = 'GET_EMPLOYEE'



function fetchEmployeesPending() {
    return {
        type: FETCH_EMPLOYEES_PENDING
    }
}

function fetchEmployeesSuccess(employees) {
    return {
        type: FETCH_EMPLOYEES_SUCCESS, 
        payload :{ employees }
    }
}

function fetchEmployeesError(error) {
    return {
        type: FETCH_EMPLOYEES_ERROR,
        error: error
    }
}
 

function getAllEmployees(){

    let url = GET_EMP_URL

    return (dispatch, getState)=>{
        ActionUtility.invokeServiceGet(dispatch, FETCH_EMPLOYEES, url);
    }

/*
    return (dispatch, getState)=>{

        dispatch( { type: PENDING, payload: null } ) 

        axios.get(GET_EMP_URL,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
              } 
        })
        .then((response) => {
            console.log("Employees:::",response.data)
            dispatch( { type: FETCH_EMPLOYEES, payload: response.data } ) 
            dispatch( { type: FINISHED, payload: null } )
             
        }, (error) => {
            //dispatch( { type: SIGNIN, payload: error } ) 
            console.log(error);
                       
        }) 
    }*/
}

function getEmployeeById(id, employees){
    return (dispatch, getState)=>{
        
        dispatch( { type: PENDING, payload: null } )  
 
        for(var i=0; i <= employees.length - 1; i++){
            console.log('comparacion ' , employees[i].id,  i)
            if(employees[i].id === id)
                dispatch( { type: GET_EMPLOYEE, payload: employees[i] } )  
                dispatch( { type: FINISHED, payload: null } )
        }
       
    }
}

function createEmployee(emp){
 
    let empObj = {
        firstName: emp.firstName,
        lastName: emp.lastName,
        movil: emp.movil,
        address:emp.address,
        typeDocument:emp.typeDocument,
        document:emp.document,
        birthDate:emp.birthDate,
        ird:emp.ird,
        email:emp.email,
        position: emp.position,       
        bankName: emp.bankName,
        accountNumber: emp.accountNumber
    }

    return (dispatch, getState)=>{
        ActionUtility.invokeServicePost(dispatch, CREATE_EMP, empObj, NEW_EMP_URL); 
    }


/*
    return (dispatch, getState)=>{

        dispatch( { type: PENDING, payload: null } ) 

        axios.post(NEW_EMP_URL,qs.stringify({
            firstName: emp.firstName,
            lastName: emp.lastName,
            movil: emp.movil,
            address:emp.address,
            typeDocument:emp.typeDocument,
            document:emp.document,
            birthDate:emp.birthDate,
            ird:emp.ird,
            email:emp.email,
            position: emp.position,       
            bankName: emp.bankName,
            accountNumber: emp.accountNumber
        }),
        {
            headers: {
                'Authorization': 'Bearer ' + token,               
                'content-type': 'application/x-www-form-urlencoded'
            }
            
        })
        .then((response) => {
            console.log("Employees:::",response.data)
            dispatch( { type: CREATE_EMP, payload: response.data } ) 
            dispatch( { type: FINISHED, payload: null } )
            
        }, (error) => {
            //dispatch( { type: SIGNIN, payload: error } ) 
            console.log(error);
                       
        }) 
    }*/
}

export {fetchEmployeesSuccess, fetchEmployeesPending, fetchEmployeesError, 
    getAllEmployees, createEmployee, getEmployeeById};

