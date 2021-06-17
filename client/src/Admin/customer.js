import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { createCustomer, getCustomer, updateCustomer, NEW_CUSTOMER } from '../redux/actions/customerActions'
import { ALERT } from '../redux/constants/ActionTypes';

export default function Customer(props) {

    const dispatch = useDispatch();
    const customer = useSelector(state => state.customerReducer.customer)
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: ALERT, payload: null })
        if (id) 
            dispatch(getCustomer(id))
        else
            dispatch({ type: NEW_CUSTOMER, payload: null })
    }, [id])

    const handleChange = (ev) => {
        ev.persist();
        dispatch({ type: "updatecustomer", payload: { ...customer, [ev.target.name]: ev.target.value } })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (id)
            await dispatch(updateCustomer(customer));
        else
            await dispatch(createCustomer(customer));
    }

    return (
        <div className="container">

            <br /><br /><br />
            <h4>Customer</h4>

            <form onSubmit={handlesubmit}>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" placeholder=""
                        value={customer.firstName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="fistName">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" placeholder=""
                        value={customer.lastName} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="fistName">Email</label>
                    <input type="text" className="form-control" id="email" name="email" placeholder=""
                        value={customer.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="fistName">Phone Number</label>
                    <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder=""
                        value={customer.phoneNumber} onChange={handleChange} />
                </div>

                <div className="btn-toolbar justify-content-between">
                    <button type="submit" className="btn btn-primary float-right">Save</button>
                </div>

            </form>
        </div>
    )
}