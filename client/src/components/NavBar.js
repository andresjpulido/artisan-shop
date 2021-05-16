import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    navCollapsed: true
}

_onToggleNav = () => {
    console.log("_onToggleNav")
    this.setState({ navCollapsed: !this.state.navCollapsed })

}

  handleClick = event => {
    localStorage.setItem('session', 0);
    console.log("Cleaning session from localstorage")
    this.props.history.push('/')
  }

  isAdmin = () =>{
    let user = this.props.user;
    console.log(user.username)
    if(user.username === "admin"){
      return "dropdown"
    }else{
      return "dropdown d-none";
    }    
  }

  render() { 
    const { navCollapsed } = this.state 
    let user = this.props.user;
    
    if(typeof user.token === 'undefined')
      return (
        <div></div>
      )
    else
  
      return (
 
        <nav className="navbar navbar-expand-md navbar-dark fixed-top">
           Store 
          <button className="navbar-toggler" type="button" data-toggle="collapse" 
          data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" 
          aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse ' + navCollapsed} 
          id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={`/home`} className="nav-link">Home </Link>
              </li>
              <li className={this.isAdmin()}>
                <Link to={`/admin`} className="nav-link" data-toggle="dropdown">Admin</Link>
                <ul className="dropdown-menu"> 
                  <li className="text-center"><Link to={`/employees`}>Employees</Link></li>                  
                  <li className="text-center"><Link to={`/movements`}>Inventory</Link></li>
                  <li className="text-center"><Link to={`/parameters`}>Parameters</Link></li>
                  <li className="text-center"><Link to={`/payslips`}>Payslips</Link></li>
                  <li className="text-center"><Link to={`/producttype`}>Product Type</Link></li>
                </ul>
              </li>              
              <li className="dropdown">
                <Link to={`/orders`} className="nav-link" data-toggle="dropdown">Orders</Link>
                <ul className="dropdown-menu">
                  <li className="text-center"><Link to={`/orders`}>Active</Link></li>
                  <li className="text-center"><Link to={`/order`}>New</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to={`/inventory`} className="nav-link">Inventory</Link> 
              </li>
              <li className="dropdown">
                <Link to={`/ea`} className="nav-link">Hours</Link> 
              </li>
              <li className="dropdown">
                <Link to={`/reports/reports`} className="nav-link" data-toggle="dropdown">Reports</Link>
                <ul className="dropdown-menu">
                  <li className="text-center">
                    <Link to={`/reports/production`}>Production</Link></li>
                  <li className="text-center">
                    <Link to={`/reports/orders`}>Activity</Link></li>
                </ul>
              </li>
            </ul>

            {user.username}
            &nbsp;
            <form className="form-inline mt-2 mt-md-0" >              
              <Link to={`/`} onClick={this.handleClick.bind(this)}>Logout</Link>
            </form>
          </div>
        </nav>
      );
    }
  }

  const mapStateToProps = (state) => {
    return { 
      user: state.authReducer.user
    }
  }
  
  const mapDispatchToProps = dispatch => bindActionCreators({
     
  }, dispatch)
  
export default (connect(mapStateToProps, mapDispatchToProps))(NavBar);
 
//export default NavBar;