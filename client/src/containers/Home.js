import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'; 
import {getOrders} from '../redux/actions/orderActions';

class Dashboard extends Component {
   
  componentDidMount(){
    console.log(this.props.user)
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
      this.props.history.push('/')
      return (<div className="container"></div>)
    }

    //this.props.getOrders();

    return (
      <div className="container">
      <br /><br /><br />

        <div className="jumbotron">

        <h1>Welcome {user.username}!</h1>
         {this.formatLastLogin()} 

         <h1>Notifications</h1>
         {
            this.props.orders && this.props.orders.lenght > 0  &&
            <p className="lead">There are <span className="badge">5</span> pending orders.</p>
         }
            
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.authReducererror, 
    pending: state.pending,
    user: state.authReducer.user,
    orders: state.orderReducer.orders
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrders
}, dispatch) 

export default (connect(mapStateToProps, mapDispatchToProps))(Dashboard);

