import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { getPayslips } from '../redux/actions/payslipActions';
import PayslipForm from './PayslipForm';
import { ALERT } from '../redux/constants/ActionTypes';
import { useHistory } from "react-router-dom";
import { PAYSLIPPDF_URL } from '../redux/constants/webservices';

window.operateEvents = {
  'click .like': function (e, value, row, index) {
    alert('You click like action, row: ' + JSON.stringify(row))
  }
}


export default function payslips() {

  const payslips = useSelector(state => state.payslipReducer.payslips)

  const dispatch = useDispatch();
  let history = useHistory()

  useEffect(() => {
    dispatch({ type: ALERT, payload: null })
  }, [])


  const linkFormatter = (value, row, index, field) => {
    var url = PAYSLIPPDF_URL + "/" + value

    return (
      <div>
        <a href={url} target="blank">Pdf</a>
      </div>
    );
  }

  const columns = [
    {
      dataField: 'period',
      text: 'Period',
      sort: true
    },
    {
      dataField: 'createdAt',
      text: 'Date',
      sort: true
    },  
    {
      dataField: 'total',
      text: 'Total',
      sort: true,
      clickToSelect: false,
    },
    {
      dataField: 'id',
      text: 'File',
      sort: true,
      formatter: linkFormatter
    }
  ]

  const handleSubmit = async (dataForm) => {
    console.log("dataForm ", dataForm)
    dispatch(getPayslips(dataForm))
  }

  const handleNew = (e) => {
    e.preventDefault();
    history.push('/payslip')
  }

  return (
    <div className="container">

      <br /><br /><br />
      <h4>Payslips</h4>

      <PayslipForm action={handleSubmit} />

      <button id="bdf1" className="btn btn-link float-right" type="button" onClick={handleNew}>Create new</button>
      <div>&nbsp;</div>

      {
        payslips.length > 0 ?

          <BootstrapTable
            striped
            hover
            keyField='id'
            data={payslips}
            columns={columns} />
          :
          <div className="alert alert-light" role="alert">
            No results!
        </div>
      }

    </div>
  );
}