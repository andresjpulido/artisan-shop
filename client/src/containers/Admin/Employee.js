import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {createEmployee} from '../../redux/actions/employeeActions'

class Employee extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) { 
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    })
    
    this.props.employee[name]= value;

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createEmployee(this.props.employee);
    this.props.history.push('/employees')
  }

  back = () => {
    this.props.history.push('/employees')
  }

  render() {
    return (
      <div className="container">

        <br /><br /><br />
        <h4>Employee</h4>

        <form>
          <div className="form-group">
            <label for="nameInput">FistName</label>
            <input type="text" className="form-control" id="name" name="firstName" placeholder="Name" 
            value={this.props.employee.firstName} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">LastName</label>
            <input type="text" className="form-control" id="record" name="lastName" placeholder="" 
            value={this.props.employee.lastName} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect1">Movil</label>
            <input type="text" className="form-control" id="movil" name="movil" placeholder="" 
            value={this.props.employee.movil} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label for="record">Email</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="name@domain.com" 
            value={this.props.employee.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label for="record">Address</label>
            <input type="text" className="form-control" id="address" name="address" placeholder="" 
            value={this.props.employee.address} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label for="ird">IRD</label>
            <input type="text" className="form-control" id="ird" name="ird" placeholder="" 
            value={this.props.employee.ird} onChange={this.handleChange} />
          </div>  
          <div className="form-group">
            <label for="document">Document</label>
            <input type="text" className="form-control" id="document" name="document" placeholder="" 
            value={this.props.employee.document} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label for="birthDate">Birth Date</label>
            <input type="Date" className="form-control" id="birthDate" name="birthDate" placeholder="" 
            value={this.props.employee.birthDate} onChange={this.handleChange} />
          </div>    
          <div className="form-group">
            <label for="position">Birth Date</label>
            <select className="form-control" id="position" name="position" onChange={this.handleChange}  >
              <option value="JEWER">Jewer</option>
              <option value="MANAGER">Manager</option>
            </select> 
          </div>  
          <div className="form-group">
            <label for="bankName">Bank Name</label>
            <input type="text" className="form-control" id="bankName" name="bankName" placeholder="" 
            value={this.props.employee.bankName} onChange={this.handleChange} />
          </div> 
          <div className="form-group">
            <label for="accountName">Account Name</label>
            <input type="text" className="form-control" id="accountName" name="accountName" placeholder="" 
            value={this.props.employee.accountName} onChange={this.handleChange} />
          </div>                                                       
        </form>
        <button type="button" className="btn btn-primary float-left" onClick={this.back}>Back</button>
        
        <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit}>Save</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    employee: state.employeeReducer.employee,
    pending: state.pending
  }
}
 
const mapDispatchToProps = dispatch => bindActionCreators({
  createEmployee: createEmployee
}, dispatch)  

export default (connect(mapStateToProps, mapDispatchToProps))(Employee);
