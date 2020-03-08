import React, { Component } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Login from './Login';
import Home from './Home';
import Orders from './Orders';
import Order from './Order';
import Inventory from './inventory/Inventory';
import Movement from './inventory/movement';
import Movements from './Admin/movements';
import ExtraHours from './ExtraHours';
import NewProductType from './NewProductType';
import NewEA from './EA/NewEA';
import Admin from './Admin/Admin';
import Employees from './Admin/Employees';
import Employee from './Admin/Employee';
import Payslip from './Admin/Payslip';
import Payslips from './Admin/Payslips';
import Parameters from './Admin/Parameters'
import ProductType from './Admin/ProductType'
import OnePayslip from './EA/OnePayslip';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'; 


class App extends Component {
 

  render() {

    console.log(this.props.pending)
    //const session = localStorage.getItem('session');
 var _pending = this.props.pending

    return (
      <div>

        <BrowserRouter>
        <div>
          <NavBar />
            <Switch>
              <Route
                path="/"
                exact
                component={Login}                
              />
              <Route
                path="/home"
                exact
                component={Home}
              />
              <Route
                path="/admin"
                exact
                component={Admin}
              />
              <Route
                path="/employees"
                exact
                component={Employees}
              />   
              <Route
                path="/employee"
                exact
                component={Employee}
              />                                               
              <Route
                path="/orders"
                exact
                component={Orders}
              />
              <Route
                path="/order"
                exact
                component={Order}
              />
              <Route
                path="/inventory"
                exact
                component={Inventory}
              />
              <Route
                path="/movement"
                exact
                component={Movement}
              />    
              <Route
                path="/movements"
                exact
                component={Movements}
              />                        
              <Route
                path="/ea"
                exact
                component={ExtraHours}
              />
              <Route
                path="/newproducttype"
                exact
                component={NewProductType}
              />
              <Route
                path="/newea"
                exact
                component={NewEA}
              />
              <Route
                path="/parameters"
                exact
                component={Parameters}
              />               
              <Route
                path="/payslip"
                exact
                component={Payslip}
              />    
              <Route
                path="/payslips"
                exact
                component={Payslips}
              />   

              <Route
                path="/producttype"
                exact
                component={ProductType}
              />

              <Route
                path="/onepayslip"
                exact
                component={OnePayslip}
              />                     
              <Redirect to="/" />
            </Switch>

            {
            _pending   &&
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            }
   
        </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}
 

const mapStateToProps = (state) => {
  return {
    error: state.generalReducer.error, 
    pending: state.generalReducer.pending 
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch) 

export default (connect(mapStateToProps, mapDispatchToProps))(App);
