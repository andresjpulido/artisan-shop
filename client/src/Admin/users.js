import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { dateFormatter } from '../utils/formatters';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getUsers, deleteUser } from '../redux/actions/userActions'
import { useHistory } from "react-router-dom";
import { ALERT } from '../redux/constants/ActionTypes';

export default function Users(props) {

    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.users)
    const [numberRows, setNumberRows] = useState(0)
    const table = useRef(null);
    let history = useHistory()

    const columns = [
        {
            dataField: 'username',
            text: 'Username',
            sort: true
        },
        {
            dataField: 'lastlogin',
            text: 'Last login',
            sort: true,
            formatter: dateFormatter
        },
        {
            dataField: 'id_employee',
            text: 'Employee',
            sort: true
        }]

    useEffect(() => {
        dispatch(getUsers())
        dispatch({ type: ALERT, payload: null })

    }, [])

    const rowEvents = {

        onClick: (e, row, rowIndex) => {
            props.history.push('/user/' + row.id)
        },

        onMouseEnter: (e, row, rowIndex) => {

        }

    };

    const handleNew = (e) => {
        e.preventDefault();
        history.push('/user')
    }

    const deleteRows = async () => {
        const rows = table.current.selectionContext.selected;
        console.log(rows)
        await dispatch(deleteUser(rows));
    }

    return (
        <div className="container">

            <br /><br /><br />
            <h4>Users</h4>

            <button id="b1" className="btn btn-link float-right" type="button" onClick={handleNew}>Create new</button>

            {
                numberRows > 0 && users.length > 0 &&
                <button id="deleter" className="btn btn-link float-right" type="button" onClick={deleteRows}>Delete</button>
            }

            <BootstrapTable
                striped
                hover
                keyField='id'
                data={users}
                columns={columns}
                ref={table}
                pagination={paginationFactory()}
                rowEvents={rowEvents} />

        </div>
    )
}