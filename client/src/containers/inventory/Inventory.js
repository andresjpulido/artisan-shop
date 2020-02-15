import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getAll} from '../../redux/actions/inventoryActions'

class Inventory extends Component {

  state = {
    amount: 0,
    type: "Toki",
    size: "Small",
    inventory: [],
    columns: [{
      dataField: 'amount',
      text: 'Amount'
    },
    {
      dataField: 'productType.name',
      text: 'Product',
      sort: true
    },
    {
      dataField: 'size.name',
      text: 'Size',
      sort: true
    }] 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/movement')
  }
   
  componentWillMount() {     
    this.props.getAll();
    console.log(this.state.inventory)
  }

  render() {
    return (

      <div className="container">

        <br /><br /><br />
        <h4>Inventory</h4>

        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.props.inventory}
          columns={this.state.columns} />

        <button id="move" className="btn btn-secondary" type="button" onClick={this.handleSubmit}>Move</button>

      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.generalReducer.error,
    pending: state.generalReducer.pending,
    inventory: state.inventoryReducer.inventory 
  }
}
 
const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: getAll
}, dispatch)  

export default (connect(mapStateToProps, mapDispatchToProps))(Inventory);
 