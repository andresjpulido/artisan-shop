import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getHours} from '../../redux/actions/hourActions'
import {getAllEmployees} from '../../redux/actions/employeeActions'
import BootstrapTable from 'react-bootstrap-table-next';
import { dateFormatter } from '../../utils/formatters'

class Payslip extends Component {

  constructor(props){
    super(props);
     
    this.state = {
      unpaidHours: [],
      columns: [{
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
    } 
  }

  componentWillMount() {    
    this.props.getAllEmployees();
  } 

  findSubmit = (e) => {
    e.preventDefault();
  //this.props.history.push('/payslips')

  const u = this.props.user;  
  console.log(u)
  this.props.getHours("apulido");

  //TODO invoke gethours no paid by this user
  //update table
  //----------------------------------------
  //user choose the hours and click in create button
    

  }

  createSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/payslips')
  }

  getSelectedRowKeys() { 
    console.log(this.refs.table)
     console.log(this.refs.table.selectionContext.selected)
   }

  fillSelectEmployees(){
    console.log(this.props.employees)
     
  }


  render() {
    const selectRow = {
      mode: 'checkbox' ,
      onSelect: this.onRowSelect,
    };

  
    return (
      <div className="container">

        <br /><br /><br />
        <h4>Payslip</h4>
        <form>
          <div className="form-group">
            <label for="nameInput">Employee</label>
            <select className="form-control" id="amountInput"
              onChange={this.handleChange} >
                {this.fillSelectEmployees()}
                {this.props.employees.map((team) => <option key={team.value} value={team.firstName}>{team.firstName}</option>)}
            </select>         
            <button type="submit" className="btn btn-primary float-right" onClick={this.findSubmit}>Find</button>
          </div>
        </form>
 
        { this.props.unpaidHours.length > 0 &&
          <div>
          <BootstrapTable
            striped
            hover
            keyField='id'
            data={this.props.unpaidHours}
            columns={this.state.columns} 
            selectRow={ selectRow } 
            ref='table' />

          <button type="submit" className="btn btn-primary float-right" onClick={this.createSubmit}>Create</button>

          </div>
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.generalReducer.error,
    pending: state.generalReducer.pending,
    employees: state.employeeReducer.employees,    
    user: state.authReducer.user,     
    unpaidHours: state.hourReducer.unpaidHours 
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getHours: getHours,
  getAllEmployees: getAllEmployees,
}, dispatch)

export default (connect(mapStateToProps, mapDispatchToProps))(Payslip);