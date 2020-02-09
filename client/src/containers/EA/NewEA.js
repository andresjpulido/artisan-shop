import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {addHour} from '../../redux/actions/hourActions'

class NewEA extends Component {
 
  constructor(props) {
    super(props); 
    
    this.state = { 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {

    e.preventDefault();
    const user = this.props.user;
    console.log(user)
    var hour = {
      id_emp: user.employee.id,
      activity: this.props.hour.activity,
      start_date: new Date(),
      end_date: new Date(),
      amount: this.props.hour.amount
    }
    console.log(hour)
    this.props.addHour(hour);
    this.props.history.push('/ea')
  }
  
  handleChange(e) { 
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    })
    
    this.props.hour[name]= value;

  }

  render() {
    return (
      <div className="container">

        <br /><br /><br />
        <h4>New Hour</h4>

        <form onSubmit={this.handleSubmit}>
 
          <div className="form-group">
            <label for="dateInput">Date</label>
            <input type="date" className="form-control" id="dateInput" placeholder="" />
          </div>
          <div className="form-group">
            <label for="amountInput">Amount</label>
            <select className="form-control" id="amount" name="amount" value={this.props.hour.amount} 
              onChange={this.handleChange} >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              
            </select>
          </div>
          <div className="form-group">
            <label for="activitiesInput">Activities</label>
            <textarea className="form-control" id="activitiesInput" name="activity" value={this.props.hour.activity} onChange={this.handleChange} />
          </div>

        </form>
        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary float-right">Save</button>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.error,
    unpaidHours: state.hourReducer.unpaidHours,
    pending: state.pending,
    hour: state.hourReducer.hour,
    user: state.authReducer.user,
  }
}
 
const mapDispatchToProps = dispatch => bindActionCreators({ 
  addHour: addHour
}, dispatch)  

export default (connect(mapStateToProps, mapDispatchToProps))(NewEA); 
 
