import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../redux/actions/inventoryActions'
import { useHistory } from "react-router-dom";
import InventoryFilter from './components/inventoryfilter';


export default function Inventory() {

  const inventory = useSelector(state => state.inventoryReducer.inventory)

  const [numberRows, setNumberRows] = useState(0)

  const dispatch = useDispatch();
  let history = useHistory()

  useEffect(() => {
    dispatch(getAll())
  }, [])

  const columns = [{
    dataField: 'amount',
    text: 'Amount'
  },
  {
    dataField: 'product',
    text: 'Product',
    sort: true
  }
    ,
  {
    dataField: 'size',
    text: 'Size',
    sort: true
  },
  {
    dataField: 'location',
    text: 'Location',
    sort: true
  }]

  const handleSubmit = async (dataForm) => {

    let queryObj = {}
    if (dataForm.id_productType !== "0")
      queryObj.id_productType = dataForm.id_productType
    if (dataForm.id_location !== "0")
      queryObj.location = dataForm.id_location
    if (dataForm.id_size !== "0")
      queryObj.id_size = dataForm.id_size

    dispatch(getAll(queryObj))
  }


  return (

    <div className="container">

      <br /><br /><br />
      <h4>Inventory</h4>

      <InventoryFilter action={handleSubmit} />

      <BootstrapTable
        striped
        hover
        keyField='id'
        data={inventory}
        columns={columns}
        pagination={paginationFactory()}
      />

      <button id="move" className="btn btn-secondary" type="button" onClick={handleSubmit}>Move</button>

    </div>


  );
}

