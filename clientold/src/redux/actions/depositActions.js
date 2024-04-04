import { DEPOSIT_URL } from "../constants/webservices";
import { PENDING, FINISHED, ALERT } from "../constants/ActionTypes";
import axios from "axios";
import ActionUtility from "./utilAction";

export const GET = "GET_DEPOSIT";
export const DEL = "DEL";
export const UPD = "UPD";
export const ADD = "ADD";

function readAllDeposit(queryObj) {  
  console.log(queryObj,DEPOSIT_URL)
  return (dispatch, getState) => {
    ActionUtility.invokeServiceGet(dispatch, GET, DEPOSIT_URL, queryObj);
  };
}

function readOne(id) {
  let url = DEPOSIT_URL + "/" + id;
  return (dispatch, getState) => {
    ActionUtility.invokeServiceGet(dispatch, GET, url);
  };
}

function create(location) {
  return (dispatch, getState) => {
    ActionUtility.invokeServicePost(dispatch, ADD, location, DEPOSIT_URL);
  };
}

function del(ids) {
  return (dispatch, getState) => {
    let token = localStorage.getItem("session");

    dispatch({ type: PENDING, payload: null });

    const productTypesObj = {
      ids: ids,
    };
    axios
      .delete(DEPOSIT_URL, {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
        data: productTypesObj,
      })

      .then((response) => {
        dispatch({
          type: ALERT,
          payload: {
            type: "SUCCESS",
            description: "Your request has been successfully processed.",
          },
        });
        dispatch(readAllDeposit());
      })

      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          if (error.response.data) {
            dispatch({
              type: ALERT,
              payload: {
                type: "ERROR",
                description: error.response.data.message,
              },
            });
            dispatch({ type: FINISHED, payload: null });
          }
        } else if (error.request) {
          dispatch({
            type: ALERT,
            payload: {
              type: "ERROR",
              description: error.request,
            },
          });
        } else {
          dispatch({
            type: ALERT,
            payload: {
              type: "ERROR",
              description: error.message,
            },
          });
        }

        console.log(error.config);

        if (!error.response) {
          dispatch({
            type: ALERT,
            payload: {
              type: "ERROR",
              description: "No connection with the server.",
            },
          });
          dispatch({ type: FINISHED, payload: null });
        }
      });
  };
}

function update(location) {
  return (dispatch, getState) => {
    ActionUtility.invokeServicePUT(dispatch, UPD, location, DEPOSIT_URL);
  };
}

export { readAllDeposit, create, readOne, del, update };
