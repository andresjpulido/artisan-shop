import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParameters } from '../redux/actions/parameterActions'

export default function Parameters() {

  const dispatch = useDispatch();
  const parameters = useSelector(state => state.parameterReducer.parameters)

  useEffect(() => {
    dispatch(getParameters())
  }, [])

  const handleChange = (ev) => {
    ev.persist();
    dispatch({ type: "update", payload: { ...parameters, [ev.target.name]: ev.target.value } })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();    
    //await dispatch(createOrder(order));
  }

  return (
    <div className="container">

      <br /><br /><br />
      <h4>Parameters</h4>
      <form onSubmit={handlesubmit}>
        {
          parameters.map((item, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={item.label}>{item.label}</label>
              <input type="text" className="form-control" name={item.label} value={item.value} onChange={handleChange} />
            </div>
          ))
        }

        <button type="submit" className="btn btn-primary float-right">Save</button>
      </form>
    </div>
  );

}
