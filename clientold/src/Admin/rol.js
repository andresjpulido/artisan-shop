import React, { useEffect, useRef, useState } from 'react';
import { createRol, updateRol, getRol, UPD_ROL, NEW_ROL } from '../redux/actions/rolActions'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getResources } from '../redux/actions/resourceActions';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ALERT } from '../redux/constants/ActionTypes';

export default function Rol() {

  const rol = useSelector(state => state.rolReducer.rol)
  const resources = useSelector(state => state.resourceReducer.resources)

  const [numberRows, setNumberRows] = useState(0)

  const dispatch = useDispatch();
  let history = useHistory()
  const { id } = useParams();
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

    if (id) {
      dispatch(getRol(id));
    }
    else {
      dispatch({ type: NEW_ROL, payload: null })
    }


  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id)
      dispatch(updateRol(rol))
    else
      dispatch(createRol(rol))
  }

  const goback = () => {
    dispatch({ type: ALERT, payload: null })
    history.push("/roles")
  }

  const handleChange = (ev) => {
    ev.persist();
    dispatch({ type: UPD_ROL, payload: { ...rol, [ev.target.name]: ev.target.value } })
  }

  const onRowSelect = (row, isSelect, rowIndex, e) => {
    if (isSelect)
      setNumberRows(numberRows + 1);
    else
      setNumberRows(numberRows - 1);
  }

  const onRowSelectAll = (isSelect, rows, e) => {
    if (isSelect)
      setNumberRows(rows.length);
    else
      setNumberRows(0);
  }

  const selectRow = {
    mode: 'checkbox',
    onSelect: onRowSelect,
    onSelectAll: onRowSelectAll
  };

  return (
    <div className="container">

      <br /><br /><br />
      <h4>Rol</h4>

      <form>

        <div className="form-group">
          <label htmlFor="nameInput">Username<span className="text-danger"> *</span></label>
          <input type="text" className="form-control" id="name" name="firstName" placeholder="Name"
            value={rol.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Description</label>
          <input type="text" className="form-control" id="movil" name="movil" placeholder=""
            value={rol.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <BootstrapTable
            striped
            hover
            keyField='id'
            data={resources}
            columns={columns}
            ref={table}
            selectRow={selectRow}
          />
        </div>

        <div className="btn-toolbar justify-content-between">
          <button type="button" className="btn btn-primary float-left" onClick={goback}>Back</button>
          <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Save</button>
        </div>

      </form>

    </div>
  );
}