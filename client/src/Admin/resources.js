import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next'; 
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getResources } from '../redux/actions/resourceActions' 
import { ALERT } from '../redux/constants/ActionTypes';

export default function Resources(props) {

    const dispatch = useDispatch();
    const resources = useSelector(state => state.resourceReducer.resources)
    
    const table = useRef(null);
    
    const columns = [
        {
            dataField: 'name',
            text: 'name',
            sort: true
        },
        {
            dataField: 'description',
            text: 'description',
            sort: true
        }]

    useEffect(() => {
        dispatch(getResources())
        dispatch({ type: ALERT, payload: null })

    }, [])

    return (
        <div className="container">

            <br /><br /><br />
            <h4>Resources</h4>

            <BootstrapTable
                striped
                hover
                keyField='id'
                data={resources}
                columns={columns}
                ref={table}
                pagination={paginationFactory()}
            />

        </div>
    )
}