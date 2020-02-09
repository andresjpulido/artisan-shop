import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getAllEmployees} from '../../redux/actions/employeeActions'

class Payslip extends Component {

  componentWillMount() {    
    this.props.getAllEmployees();
  } 

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/payslips')
  }

  fillSelectEmployees(){
    console.log(this.props.employees)
     
  }


  render() {

  
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
            <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit}>Find</button>
          </div>
        </form>
 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    employees: state.employeeReducer.employees,
    pending: state.pending
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  //fetchEmployees: fetchEmployeesAction,
  getAllEmployees: getAllEmployees
}, dispatch)

export default (connect(mapStateToProps, mapDispatchToProps))(Payslip);