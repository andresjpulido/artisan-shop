import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import gem from '../assets/images/gem.png';
import signIn from '../redux/actions/authAction';
import mykey from './key'

export default function Login() {

  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" })
  const [isValid, setisValid] = useState(false)

  useEffect(() => {
    localStorage.setItem('session', 0);
  }, [])

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    const NodeRSA = require('node-rsa');
    const key = new NodeRSA(mykey);
    const encryptedStr = key.encrypt(form.password, 'base64');
     
    let queryObj = {username:form.username, password:encryptedStr};    
    queryObj.password = encryptedStr
    const u = dispatch(signIn(queryObj));

    //event.target.reset()
  }

  const onChange = ev => {
    setForm(form => ({ ...form, [ev.target.name]: ev.target.value }));
  };

  /*
    if (user && user.token) {
      localStorage.setItem('session', user.token);
      this.props.history.push('/home')
    }
  */

  return (
    <div className="vertical-center">

      <div className="container ">
        <br /><br />
        <div className="card">
          <div className="card-body">
            <div className="row">
              <img src={gem} className="mx-auto d-block" alt="..." />
            </div>
            <div className="row">
              <div className="col-sm">
                <h2 className="text-primary text-center ">Sign in</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" value={form.username} onChange={onChange} name="username"
                  className="form-control" id="username" placeholder="username"
                  autoComplete="new-password" minLength="5" maxLength="11" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={form.password} onChange={onChange} className="form-control" id="password" name="password"
                  placeholder="Password" minLength="5" maxLength="11" required />
              </div>
              <br />
              <div className="btn-toolbar justify-content-between">
                <button type="submit" className="btn btn-primary float-right" disabled={isValid}>Login</button>
              </div>
              <br />
            </form>

          </div>
        </div>
        <br /><br /><br /><br />

      </div></div>
  );
}
