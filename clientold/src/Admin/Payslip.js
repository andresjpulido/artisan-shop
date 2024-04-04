import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { dateFormatter } from '../utils/formatters'
import { getHours } from '../redux/actions/hourActions'
import { getParameters } from '../redux/actions/parameterActions'
import { createPayslip } from '../redux/actions/payslipActions';
import PayslipForm from './PayslipForm';
import { ALERT } from '../redux/constants/ActionTypes';
import { useHistory } from "react-router-dom";

export default function Payslip() {

  const unpaidHours = useSelector(state => state.hourReducer.unpaidHours)
  const parameters = useSelector(state => state.parameterReducer.parameters)

  const [payslipHours, setpayslipHours] = useState([])
  const [payslip, setpayslip] = useState({ hours: 0 })
  const dispatch = useDispatch();
  let history = useHistory()

  useEffect(() => {
    dispatch({ type: ALERT, payload: null })
    dispatch(getParameters())
  }, [])

  const table = useRef(null);

  const columns = [{
    dataField: 'end_date',
    text: 'Date',
    formatter: dateFormatter
  },
  {
    dataField: 'amount',
    text: 'Hours',
    sort: true
  },
  {
    dataField: 'activity',
    text: 'Activity'
  }]

  const handleSubmit = async (dataForm) => {
    console.log("dataForm ", dataForm)
    
    payslip.employeeid = dataForm.employeeid;
    setpayslip(payslip);

    dispatch(getHours({id_emp:payslip.employeeid, isPaid:false}))
  }

  const preview = (e) => {
    e.preventDefault();

    //TODO check the hours selected
    const rows = table.current.selectionContext.selected;
    
    setpayslipHours([]);

    let hours = [];
    let totalhours = 0
    const hourValue = getParam(parameters, "COST_HOUR");
    const tax = getParam(parameters, "TAX_PERC");
    let totalhourValue  = 0.0;

    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < unpaidHours.length; j++) {
        let hour = unpaidHours[j];
        if (hour.id === rows[i]) {
          hour.hourValue = hourValue;
          hours.push(hour)
          totalhours = totalhours + hour.amount
          totalhourValue = totalhourValue + (totalhours * hourValue)
        }
      }
    }
    
    payslip.hours = totalhours
    payslip.hourValue = totalhourValue
    payslip.taxes = tax * totalhourValue / 100;
    payslip.total = totalhourValue - payslip.taxes;
    payslip.period = "";
    payslip.hoursIDs = rows

    setpayslip(payslip)
    setpayslipHours(hours)
     
    console.log("payslip", payslip)

  }

  const generate = (e) => {
    e.preventDefault();
    dispatch(createPayslip(payslip))
  }

  const onRowSelect = (row, isSelect, rowIndex, e) => {

  }

  const onRowSelectAll = (isSelect, rows, e) => {

  }

  const selectRow = {
    mode: 'checkbox',
    onSelect: onRowSelect,
    onSelectAll: onRowSelectAll
  };


  const goback = () => {
    dispatch({ type: ALERT, payload: null })
    history.push("/ea")
  }

  const getParam = (params, code) => {
		for (var i = 0; i < params.length; i++) {
			if (params[i].code === code) {
				return params[i].value;
			}
		}
	}

  return (
    <div className="container">

      <br /><br /><br />
      <h4>Payslip</h4>

      <PayslipForm action={handleSubmit} />

      {
        unpaidHours.length > 0 &&

        <div className="">

          <h3>Available hours</h3>

          <BootstrapTable
            striped
            hover
            keyField='id'
            data={unpaidHours}
            columns={columns}
            selectRow={selectRow}
            ref={table}
          />

          <form onSubmit={preview}>
            <div className="btn-toolbar justify-content-between">
              <button type="submit" className="btn btn-primary float-right">Preview</button>
              <button type="button" className="btn btn-primary float-left" onClick={goback}>Back</button>
            </div>
          </form>
        </div>
      }

      {
        payslipHours && payslipHours.length > 0 &&
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>

                <th scope="col">Day</th>
                <th scope="col">Hours</th>
              </tr>
            </thead>
            <tbody>
              {
                payslipHours.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.start_date}</td>
                    <td>{item.amount}</td>
                    <td>{item.hourValue}</td>
                  </tr>
                ))
              }

              <tr>
                <th scope="row" colSpan="2">Worked hours:</th>
                <td>{ payslip.hours }</td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" colSpan="3">Basic Income</th>
                <td>{payslip.hourValue}</td>
              </tr>
              <tr>
                <th scope="row" colSpan="3">Tax</th>
                <td>- { payslip.taxes }</td>
              </tr>
              <tr>
                <th scope="row" colSpan="3">Take Home Pay</th>
                <td>{ payslip.total }</td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-primary float-right" onClick={generate}>Generate</button>
        </div>
      }
    </div>
  );
}