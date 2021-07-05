import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { dateFormatter } from '../utils/formatters';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { readAllCustomer } from '../redux/actions/customerActions'
import { ALERT } from '../redux/constants/ActionTypes';

export default function Customers(props) {

    const dispatch = useDispatch();
    const customers = useSelector(state => state.customerReducer.customers)
    const columns = [
        {
            dataField: 'firstName',
            text: 'First Name',
            sort: true
        },
        {
            dataField: 'lastName',
            text: 'Last Name',
            sort: true
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true
        },
        {
            dataField: 'phoneNumber',
            text: 'Phone Number',
            sort: true
        },
        {
            dataField: 'createdAt',
            text: 'Creation Date',
            sort: true,
            formatter: dateFormatter
        }]

    useEffect(() => {
        dispatch(readAllCustomer())
        dispatch({ type: ALERT, payload: null })

    }, [])

    const rowEvents = {

        onClick: (e, row, rowIndex) => {
            console.log(`clicked on row with index: ${row.id} - ${rowIndex}`);
            props.history.push('/customer/' + row.id)
        },

        onMouseEnter: (e, row, rowIndex) => {

        }

    };

    return (
        <div className="container">

            <br /><br /><br />
            <h4>Customers</h4>

            <BootstrapTable
                striped
                hover
                keyField='id'
                data={customers}
                columns={columns}
                pagination={paginationFactory()}
                rowEvents={rowEvents} />

        </div>
    )
}