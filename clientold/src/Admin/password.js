import React, { useEffect, useState } from 'react';
import { updatePassword, getUser, NEW_USER } from '../redux/actions/userActions'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ALERT } from '../redux/constants/ActionTypes';
import mykey from '../login/key'

export default function Password() {

  const user = useSelector(state => state.userReducer.user)
  const [form, setForm] = useState({ password: "" })
  const auth = useSelector((state) => state.authReducer.auth);

  const dispatch = useDispatch();
  let history = useHistory()
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: ALERT, payload: null })
    console.log("id ", id)
    if (id) {
      dispatch(getUser(id));
    }
    else {
      dispatch({ type: NEW_USER, payload: null })
    }

  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password === form.secondpassword) {
      const NodeRSA = require('node-rsa');
      const key = new NodeRSA(mykey);
      const encryptedStr = key.encrypt(form.password, 'base64');
      dispatch(updatePassword({ id: user.id, password: encryptedStr }))
    }
  }

  const goback = () => {
    dispatch({ type: ALERT, payload: null })
    history.push("/users")
  }

  const handleChange = (ev) => {
    ev.persist();
    setForm(form => ({ ...form, [ev.target.name]: ev.target.value }));
  }

  return (
    <div className="container">

      <br /><br /><br />
      <h4>Set new password to {auth.username}</h4>

      <form>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">New password<span className="text-danger"> *</span></label>
          <input type="text" className="form-control" id="password" name="password" placeholder=""
            value={form.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Confirm the password</label>
          <input type="text" className="form-control" id="secondpassword" name="secondpassword" placeholder=""
            value={form.secondpassword} onChange={handleChange} required />
        </div>

        <div className="btn-toolbar justify-content-between">
          <button type="button" className="btn btn-primary float-left" onClick={goback}>Back</button>
          <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Save</button>
        </div>

      </form>

    </div>
  );
}