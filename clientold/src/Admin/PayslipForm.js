import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT } from '../redux/constants/ActionTypes';
import { readAllEmployee } from '../redux/actions/employeeActions';

export default function PayslipForm(props) {

    const employees = useSelector(state => state.employeeReducer.employees)
    const dispatch = useDispatch();

    const [form, setForm] = useState({ employeeid: 0 })

    useEffect(() => {
        dispatch(readAllEmployee())
        dispatch({ type: ALERT, payload: null })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        props.action(form)
    }

    const handleChange = (ev) => {
        ev.persist();
        setForm(form => ({ ...form, [ev.target.name]: ev.target.value }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nameInput">Employee</label>
                <select className="form-control" id="employeeid" name="employeeid" onChange={handleChange} value={form.employeeid}>
                <option key="0" value="0">Choose one ...</option>
                    {employees.map((team, index) => <option key={index} value={team.id}>{team.firstName}</option>)}
                </select>
            </div>
            <div className="btn-toolbar justify-content-between">
                <button type="submit" className="btn btn-primary float-right">Find</button>
            </div>
        </form>
    )
}