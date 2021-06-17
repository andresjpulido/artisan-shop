import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { dateFormatter } from '../utils/formatters';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getRoles, deleteRoles } from '../redux/actions/rolActions'
import { useHistory } from "react-router-dom";
import { ALERT } from '../redux/constants/ActionTypes';

export default function Roles(props) {

    const dispatch = useDispatch();
    const roles = useSelector(state => state.rolReducer.roles)
    const [numberRows, setNumberRows] = useState(0)
    const table = useRef(null);
    let history = useHistory()

    const columns = [
        {
            dataField: 'name',
            text: 'Name',
            sort: true
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: true
        }]

    useEffect(() => {
        dispatch(getRoles())
        dispatch({ type: ALERT, payload: null })

    }, [])

    const rowEvents = {

        onClick: (e, row, rowIndex) => {
            props.history.push('/rol/' + row.id)
        },

        onMouseEnter: (e, row, rowIndex) => {

        }

    };

    const handleNew = (e) => {
        e.preventDefault();
        history.push('/rol')
    }

    const deleteRows = async () => {
        const rows = table.current.selectionContext.selected;
        console.log(rows)
        await dispatch(deleteRoles(rows));
    }

    return (
        <div className="container">

            <br /><br /><br />
            <h4>Roles</h4>

            <button id="b1" className="btn btn-link float-right" type="button" onClick={handleNew}>Create new</button>

            {
                numberRows > 0 && roles.length > 0 &&
                <button id="deleter" className="btn btn-link float-right" type="button" onClick={deleteRows}>Delete</button>
            }

            <BootstrapTable
                striped
                hover
                keyField='id'
                data={roles}
                columns={columns}
                ref={table}
                pagination={paginationFactory()}
                rowEvents={rowEvents} />

        </div>
    )
}