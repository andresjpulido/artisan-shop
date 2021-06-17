import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'; 
import {getOrders, getOpenedOrders} from '../redux/actions/orderActions';

class Dashboard extends Component {
   
  componentDidMount(){   
    this.props.getOpenedOrders();
  }

  formatLastLogin(){
   
    var lastlogin = new Date(this.props.user.lastlogin);
     
    return (
          <p className="lead">Your last date login was {new Intl.DateTimeFormat('en-NZ', { 
              year: 'numeric', 
              month: 'long', 
              day: '2-digit' ,
              hourCycle: 'h24',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
          }).format(lastlogin)}.</p>
    )}

  render() {
    
    const user = this.props.user;
    
    if(user.username === undefined){
      //create generic method to check the session agains the jwt key 
     // this.props.history.push('/')
      return (<div className="container"></div>)
    }

    return (
      <div className="container">
      <br /><br /><br />

        <div className="jumbotron">

        <h1>Welcome {user.username}!</h1>
         {this.formatLastLogin()} 

         <h1>Notifications</h1>
         {
            this.props.orders && this.props.orders.length > 0  &&
            <p className="lead">There are<span className="badge">{this.props.orders.length}</span>pending orders.</p>
         }
            
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.generalReducer.error,
    pending: state.generalReducer.pending,
    user: state.authReducer.user,
    orders: state.orderReducer.orders
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrders, getOpenedOrders
}, dispatch) 

export default (connect(mapStateToProps, mapDispatchToProps))(Dashboard);

