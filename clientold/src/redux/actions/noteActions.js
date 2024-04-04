import { NOTE_URL } from "../constants/webservices";
import { PENDING, FINISHED, ALERT } from "../constants/ActionTypes";
import axios from "axios";
import ActionUtility from "./utilAction";

export const GET = "GET";
export const DEL = "DEL";
export const UPD = "UPD";
export const ADD = "ADD";

function readAll(queryObj) {
  
  return (dispatch, getState) => {
    ActionUtility.invokeServiceGet(dispatch, GET, NOTE_URL, queryObj);
  };
}

function readOne(id) {
  let url = NOTE_URL + "/" + id;
  return (dispatch, getState) => {
    ActionUtility.invokeServiceGet(dispatch, GET, url);
  };
}

function create(location) {
  return (dispatch, getState) => {
    ActionUtility.invokeServicePost(
      dispatch,
      ADD,
      location,
      NOTE_URL,
      "noredirect"
    );
  };
}

function del(id, id_order) {
   
  return (dispatch, getState) => {
    let token = localStorage.getItem("session");

    dispatch({ type: PENDING, payload: null });

    axios
      .delete(NOTE_URL + "/" + id, {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      })

      .then((response) => {
        dispatch({
          type: ALERT,
          payload: {
            type: "SUCCESS",
            description: "Your request has been successfully processed.",
          },
        });
        console.log("deleted !!!")
        dispatch(readAll({ id_order: id_order })); 
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
    ActionUtility.invokeServicePUT(dispatch, UPD, location, NOTE_URL);
  };
}

export { readAll, create, readOne, del, update };
