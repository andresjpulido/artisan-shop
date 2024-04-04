import React, { useEffect, useRef, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useDispatch, useSelector } from 'react-redux';
import { readAllProductTypes, delProductTypes } from '../redux/actions/productTypeActions'
import { useHistory } from "react-router-dom";

export default function ProductType() {

  const productTypes = useSelector(state => state.productTypeReducer.productTypes)

  const [numberRows, setNumberRows] = useState(0)

  const dispatch = useDispatch();
  let history = useHistory()

  useEffect(() => {
    dispatch(readAllProductTypes())
  }, [])

  const table = useRef(null);

  const columns = [
    {
      dataField: 'name',
      text: 'Name'
    }]

  const handleNew = (e) => {
    e.preventDefault();
    history.push('/producttype')
  }

  const deleteRows = async () => {
    const rows = table.current.selectionContext.selected;
    console.log(rows)
    await dispatch(delProductTypes(rows));
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

  const rowEvents = {

    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${row.id} - ${rowIndex}`);
      history.push('/producttype/' + row.id)
    },

    onMouseEnter: (e, row, rowIndex) => {

    }

  };

  return (
    <div className="container">

      <br /><br /><br />
      <h4>Product Types</h4>

      <button id="b1" className="btn btn-link float-right" type="button" onClick={handleNew}>Create new</button>
      
      {
        numberRows > 0 && productTypes.length > 0 &&
        <button id="deleter" className="btn btn-link float-right" type="button" onClick={deleteRows}>Delete</button>
      }

      <BootstrapTable
        striped
        hover
        keyField='id'
        data={productTypes}
        columns={columns}
        selectRow={selectRow}
        ref={table}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
      />



    </div>
  );

}
