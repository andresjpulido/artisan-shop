import React, { useEffect } from 'react';

import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './login/Login';
import Home from './login/Home';
import Orders from './order/Orders';
import Order from './order/Order';
import Customers from './Admin/customers';
import Customer from './Admin/customer';
import Inventory from './inventory/Inventory';
import Movement from './inventory/movement';
import Movements from './inventory/movements';
import ExtraHours from './hour/ExtraHours';
import NewEA from './hour/NewEA';
import Employees from './Admin/Employees';
import Employee from './Admin/Employee';
import Payslip from './Admin/Payslip';
import Payslips from './Admin/Payslips';
import Parameters from './Admin/Parameters'
import ProductTypes from './Admin/ProductTypes'
import ProductType from './Admin/ProductType'
import OnePayslip from './payslip/OnePayslip';
import ProductionReport from './reports/pages/production'
import OrdersReport from './reports/pages/orders'
import IndexReports from './reports/pages/reports';
import Alert from './components/alert';
import Users from './Admin/users';
import User from './Admin/user';
import Roles from './Admin/roles';
import Rol from './Admin/rol';
import Resources from './Admin/resources'; 
import { useSelector } from 'react-redux';
import Password from './Admin/password';
import Products from './inventory/products';
import Product from './inventory/product';

export default function App() {

  const pending = useSelector(state => state.generalReducer.pending)
  const redirectTo = useSelector(state => state.generalReducer.redirectTo)

  useEffect(() => {
    /* history.listen((location, action) => {
       // clear alert on location change
       // dispatch(alertActions.clear());
       console.log("had changed")
     });*/
  }, []);

  return (

    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/password/:id" exact component={Password} />

        <Route path="/employees" exact component={Employees} />
        <Route path="/employee" exact component={Employee} />
        <Route path="/employee/:id" exact component={Employee} />

        <Route path="/orders" exact component={Orders} />
        <Route path="/order" exact component={Order} />
        <Route path="/order/:id" exact component={Order} />

        <Route path="/customers" exact component={Customers} />
        <Route path="/customer/:id" exact component={Customer} />
        <Route path="/customer" exact component={Customer} />

        <Route path="/inventory" exact component={Inventory} />

        <Route path="/movement" exact component={Movement} />
        <Route path="/movements" exact component={Movements} />
        <Route path="/ea" exact component={ExtraHours} />

        <Route path="/newea/:id" exact component={NewEA} />
        <Route path="/newea" exact component={NewEA} />

        <Route path="/users" exact component={Users} />
        <Route path="/user" exact component={User} />
        <Route path="/user/:id" exact component={User} />

        <Route path="/roles" exact component={Roles} />
        <Route path="/rol" exact component={Rol} />
        <Route path="/rol/:id" exact component={Rol} />

        <Route path="/resources" exact component={Resources} />

        <Route path="/parameters" exact component={Parameters} />
        <Route path="/payslip" exact component={Payslip} />
        <Route path="/payslips" exact component={Payslips} />
        <Route path="/onepayslip" exact component={OnePayslip} />

        <Route path="/product" exact component={Product} />
        <Route path="/product/:id" exact component={Product} />
        <Route path="/products" exact component={Products} />

        <Route path="/producttypes" exact component={ProductTypes} />
        <Route path="/producttype" exact component={ProductType} />
        <Route path="/producttype/:id" exact component={ProductType} />

        <Route path="/reports/reports" exact component={IndexReports} />
        <Route path="/reports/production" exact component={ProductionReport} />
        <Route path="/reports/orders" exact component={OrdersReport} />

        <Redirect to="/" />
      </Switch>

      {
        pending &&
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      {
        redirectTo &&
        <Redirect to={redirectTo} />
      }
      <Alert />
      <Footer />

    </BrowserRouter>

  );
}