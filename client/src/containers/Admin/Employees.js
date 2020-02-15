import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getAllEmployees, getEmployeeById} from '../../redux/actions/employeeActions'

class Employees extends Component {

  state = {
    amount: 0,
    type: "Toki",
    size: "Small",
    employees: [],
    columns: [
      {
        dataField: 'id',
        text: 'id'
      },
      {
      dataField: 'firstName',
      text: 'Name'
    },
    {
      dataField: 'lastName',
      text: 'Last Name',
      sort: true
    }] 
  }

  rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${row.id} - ${rowIndex}`);
      this.props.getEmployeeById(row.id, this.props.employees)
      this.props.history.push('/employee')
    },
    onMouseEnter: (e, row, rowIndex) => {
      //console.log(`enter on row with index: ${rowIndex}`);
    }
  };
 
  handleNewEmp = (e) => {
    e.preventDefault();
    this.props.history.push('/employee')
  }

  componentWillMount() {   
    this.props.getAllEmployees();
    console.log(this.state.employees)
  }

  render() {
 
    const {employees, error, pending} = this.props;
    console.log(employees, error, pending)
 
     

    return (
      <div className="container">

        <br /><br /><br />
        <h4>Employees</h4>

        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.props.employees}
          columns={this.state.columns}
          rowEvents={this.rowEvents} />
   
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.generalReducer.error,
    pending: state.generalReducer.pending,
    employees: state.employeeReducer.employees,     
  }
}
 
const mapDispatchToProps = dispatch => bindActionCreators({
  //fetchEmployees: fetchEmployeesAction,
  getAllEmployees: getAllEmployees,
  getEmployeeById: getEmployeeById
}, dispatch)  

export default (connect(mapStateToProps, mapDispatchToProps))(Employees);
