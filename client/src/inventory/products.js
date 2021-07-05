import React, { useEffect, useRef, useState, Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { readAllProduct, deleteProduct } from '../redux/actions/productActions';
import { ALERT } from '../redux/constants/ActionTypes';
import { NO_RESULTS } from '../utils/messages';

export default function Products() {

  const products = useSelector(state => state.productReducer.products)

  const [numberRows, setNumberRows] = useState(0)

  const dispatch = useDispatch();
  let history = useHistory()

  useEffect(() => {
    dispatch(readAllProduct())
    dispatch({ type: ALERT, payload: null })
  }, [])

  const table = useRef(null);

  const columns = [
    {
      dataField: 'code',
      text: 'Code',
      sort: true
    },
    {
      dataField: 'productType.name',
      text: 'Type',
      sort: true
    },
    {
      dataField: 'size.name',
      text: 'Size'
    },
    {
      dataField: 'location.name',
      text: 'Location',
      sort: true
    }]

  const handleNew = (e) => {
    e.preventDefault();
    history.push('/product')
  }

  const deleteRows = async () => {
    const rows = table.current.selectionContext.selected;
    console.log(rows)
    await dispatch(deleteProduct(rows));
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
      history.push('/product/' + row.id)
    },
    onMouseEnter: (e, row, rowIndex) => { }
  };

  return (
    <div className="container">

      <br /><br /><br />
      <h4>Products</h4>

      <button id="b1" className="btn btn-link float-right" type="button" onClick={handleNew}>Create new</button>
      {
        numberRows > 0 &&  products.length > 0 &&
        <button id="deleter" className="btn btn-link float-right" type="button" onClick={deleteRows}>Delete</button>
      }
      
      <br /><br />
      {
        products.length > 0 ?
        <Fragment>
          
          <BootstrapTable
            striped
            hover
            keyField='id'
            data={products}
            columns={columns}
            selectRow={selectRow}
            ref={table}
            pagination={paginationFactory()}
            rowEvents={rowEvents}
          /></Fragment>

:
      <div className="alert alert-light" role="alert">
        {NO_RESULTS}
      </div>

}




    </div>
  );
}