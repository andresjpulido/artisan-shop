import React, { useEffect } from 'react';
import { createUser, updateUser, getUser, UPD_USER, NEW_USER } from '../redux/actions/userActions'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ALERT } from '../redux/constants/ActionTypes';

export default function Password() {

  const user = useSelector(state => state.userReducer.user)

  const dispatch = useDispatch();
  let history = useHistory()
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: ALERT, payload: null })
    console.log("id ", id)
    if (id) {
      dispatch(getUser(id));
    }      
    else{
      dispatch({ type: NEW_USER, payload: null })
    }
    

  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id)
      dispatch(updateUser(user))
    else
      dispatch(createUser(user))
    }

  const goback = () => {
    dispatch({ type: ALERT, payload: null })
    history.push("/users")
  }

  const handleChange = (ev) => {
    ev.persist();
    dispatch({ type: UPD_USER, payload: { ...user, [ev.target.name]: ev.target.value } })
  }

  return (
    <div className="container">

      <br /><br /><br />
      <h4>Set new password to {user.username}</h4>

      <form>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">New password<span className="text-danger"> *</span></label>
          <input type="text" className="form-control" id="record" name="lastName" placeholder=""
            value={user.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Confirm the password</label>
          <input type="text" className="form-control" id="movil" name="movil" placeholder=""
            value={user.password} onChange={handleChange} />
        </div>

       
        <div className="btn-toolbar justify-content-between">
          <button type="button" className="btn btn-primary float-left" onClick={goback}>Back</button>
          <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Save</button>
        </div>

      </form>

    </div>
  );
}