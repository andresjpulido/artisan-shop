import { EMPLOYEES_URL } from '../constants/webservices';
import { PENDING, FINISHED, ALERT } from '../constants/ActionTypes';
import axios from 'axios';
import ActionUtility from './utilAction';

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const UPD_EMPLOYEE = 'UPD_EMPLOYEE';
export const NEW_EMPLOYEE = 'NEW_EMPLOYEE';
 
function readAllEmployee(queryObj) {
    
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_EMPLOYEES, EMPLOYEES_URL, queryObj);
    }
}

function readOneEmployee(id) {
    let url = EMPLOYEES_URL + "/" + id
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_EMPLOYEE, url);
    }
}

function createEmployee(emp) {

    let empObj = {
        firstName: emp.firstName,
        lastName: emp.lastName,
        movil: emp.movil,
        address: emp.address,
        typeDocument: emp.typeDocument,
        document: emp.document,
        birthDate: emp.birthDate,
        ird: emp.ird,
        email: emp.email,
        position: emp.position,
        bankName: emp.bankName,
        accountNumber: emp.accountNumber
    }

    return (dispatch, getState) => {
        ActionUtility.invokeServicePost(dispatch, ADD_EMPLOYEE, empObj, EMPLOYEES_URL);
    }
}

function deleteEmployee(ids) {

    return (dispatch, getState) => {

        let token = localStorage.getItem('session')

        dispatch({ type: PENDING, payload: null })

        const productTypesObj = {
            ids: ids
        }
        axios.delete(EMPLOYEES_URL, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'content-type': 'application/json'
            },
            data: productTypesObj
        })

            .then((response) => {
                dispatch({
                    type: ALERT, payload: {
                        type: "SUCCESS",
                        description: "Your request has been successfully processed."
                    }
                })
                dispatch(readAllEmployee());
            })

            .catch(function (error) {

                if (error.response) {

                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    if (error.response.data) {

                        dispatch({
                            type: ALERT, payload: {
                                type: "ERROR",
                                description: error.response.data.message
                            }
                        })
                        dispatch({ type: FINISHED, payload: null })

                    }

                } else if (error.request) {
                    dispatch({
                        type: ALERT, payload: {
                            type: "ERROR",
                            description: error.request
                        }
                    })

                } else {
                    dispatch({
                        type: ALERT, payload: {
                            type: "ERROR",
                            description: error.message
                        }
                    })

                }

                console.log(error.config);

                if (!error.response) {
                    dispatch({
                        type: ALERT, payload: {
                            type: "ERROR",
                            description: "No connection with the server."
                        }
                    })
                    dispatch({ type: FINISHED, payload: null })
                }

            })
    }
}

function updateEmployee(employee) {
    return (dispatch, getState) => {
        ActionUtility.invokeServicePUT(dispatch, UPD_EMPLOYEE, employee, EMPLOYEES_URL);
    }
}

export { readAllEmployee, createEmployee, readOneEmployee, deleteEmployee, updateEmployee };

