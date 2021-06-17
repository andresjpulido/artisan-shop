import React, { useEffect } from 'react';
import { createEmployee, updateEmployee, readOneEmployee, UPD_EMPLOYEE, NEW_EMPLOYEE } from '../redux/actions/employeeActions'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ALERT } from '../redux/constants/ActionTypes';

export default function Employee() {

  const employee = useSelector(state => state.employeeReducer.employee)

  const dispatch = useDispatch();
  let history = useHistory()
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: ALERT, payload: null })
    console.log("id ", id)
    if (id) {
      dispatch(readOneEmployee(id));
    }      
    else{
      dispatch({ type: NEW_EMPLOYEE, payload: null })
    }
    

  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id)
      dispatch(updateEmployee(employee))
    else
      dispatch(createEmployee(employee))
    }

  const goback = () => {
    dispatch({ type: ALERT, payload: null })
    history.push("/employees")
  }

  const handleChange = (ev) => {
    ev.persist();
    dispatch({ type: UPD_EMPLOYEE, payload: { ...employee, [ev.target.name]: ev.target.value } })
  }

  return (
    <div className="container">

      <br /><br /><br />
      <h4>Employee</h4>

      <form>

        <div className="form-group">
          <label htmlFor="nameInput">FistName<span className="text-danger"> *</span></label>
          <input type="text" className="form-control" id="name" name="firstName" placeholder="Name"
            value={employee.firstName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">LastName<span className="text-danger"> *</span></label>
          <input type="text" className="form-control" id="record" name="lastName" placeholder=""
            value={employee.lastName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Movil</label>
          <input type="text" className="form-control" id="movil" name="movil" placeholder=""
            value={employee.movil} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="record">Email</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="name@domain.com"
            value={employee.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="record">Address</label>
          <input type="text" className="form-control" id="address" name="address" placeholder=""
            value={employee.address} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="ird">IRD<span className="text-danger"> *</span></label>
          <input type="text" className="form-control" id="ird" name="ird" placeholder=""
            value={employee.ird} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="document">Document</label>
          <input type="text" className="form-control" id="document" name="document" placeholder=""
            value={employee.document} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <input type="Date" className="form-control" id="birthDate" name="birthDate" placeholder=""
            value={employee.birthDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="position">Position</label>
          <select className="form-control" id="position" name="position" onChange={handleChange}  >
            <option value="JEWER">Jewer</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bankName">Bank Name<span className="text-danger"> *</span></label>
          <input type="text" className="form-control" id="bankName" name="bankName" placeholder=""
            value={employee.bankName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Account Number<span className="text-danger"> *</span></label>
          <input type="text" className="form-control" id="accountNumber" name="accountNumber" placeholder=""
            value={employee.accountNumber} onChange={handleChange} required />
        </div>

        <div className="btn-toolbar justify-content-between">
          <button type="button" className="btn btn-primary float-left" onClick={goback}>Back</button>
          <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Save</button>
        </div>

      </form>

    </div>
  );
}