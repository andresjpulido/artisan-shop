import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductTypes } from '../../redux/actions/productTypeActions'

class ProductType extends Component {

  state = {
    amount: 0,
    type: "Toki",
    size: "Small",
    productTypes: [],
    columns: [ 
      {
      dataField: 'name',
      text: 'Name'
      }] 
  }
 
 
  handleNew = (e) => {
    e.preventDefault();
    this.props.history.push('/newproducttype')
  }

  componentWillMount() {   
    this.props.getProductTypes(); 
  }

  render() {
 
    const { error, pending} = this.props;
     
    return (
      <div className="container">

        <br /><br /><br />
        <h4>Product Types</h4>

        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.props.productTypes}
          columns={this.state.columns} />
   
        <button id="b1" className="btn btn-secondary" type="button" onClick={this.handleNew}>Create new</button>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    productTypes: state.productTypeReducer.productTypes,
    pending: state.pending
  }
}
 
const mapDispatchToProps = dispatch => bindActionCreators({
    getProductTypes: getProductTypes 
}, dispatch)  

export default (connect(mapStateToProps, mapDispatchToProps))(ProductType);
