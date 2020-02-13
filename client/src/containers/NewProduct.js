import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';

class NewProduct extends Component {

  state = {
    amount: 0,
    type: "Toki",
    size: "Small",
    products: [],
    columns: [{
      dataField: 'type',
      text: 'Type'
    },
    {
      dataField: 'size',
      text: 'Size'
    }, {
      dataField: 'amount',
      text: 'Amount',
      sort: true
    }]
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/Producttype')
  }

  addProduct = () => {
    var id = this.state.products.length;
    var product = { "id": id, "type": this.state.type, "size": this.state.size, "amount": this.state.amount }
    this.state.products.push(product);
    this.setState({
      products: this.state.products
    })
  }


  render() {
    return (
      <div className="container">

        <br /><br /><br />
        <h4>New Product</h4>

        <form>           
          <div className="form-group">
            <label for="amountInput">Name</label>
            <input type="text" className="form-control" id="nameInput" 
              placeholder="" value={this.state.name} />
          </div>

        </form>

        <button type="button" className="btn btn-primary float-left" onClick={this.back}>Back</button>
        
        <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit}>Save</button>

        <br />
 
      </div>
    );
  }
}

export default NewProduct;
