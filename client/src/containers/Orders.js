import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux'; 
import {getOrders} from '../redux/actions/orderActions';

class Orders extends Component {
 
  state = {
    amount: 0,
    type: "Toki",
    size: "Small",
    orders: [],
    columns: [{
      dataField: 'id_orderStatus',
      text: 'Status'
    },
    {
      dataField: 'customer.firstName',
      text: 'Customer',
      sort: true
    },
    {
      dataField: 'createdAt',
      text: 'Date',
      sort: true
    }] 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/student')
  }
  
  render() {
    this.props.getOrders();
      
    return (
      <div className="container"> 

        <br /><br /><br />
        <h4>Orders</h4>

        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.props.orders}
          columns={this.state.columns} />
 
        

      </div>
    );
  }
}
 
const mapStateToProps = state => ({
    orders : state.orderReducer.orders,
    items: state.items
});

const mapDispatchToProps = {
  getOrders,
}; 

export default connect(mapStateToProps, mapDispatchToProps) (Orders);
 