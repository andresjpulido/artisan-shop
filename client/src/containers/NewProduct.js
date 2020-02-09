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
    this.props.history.push('/student')
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
            <label for="typeSelect">Product</label>
            <select className="form-control" id="typeSelect" value={this.state.type}>
              <option value="Toki">Toki</option>
              <option value="Manaia">Manaia</option>
              <option value="Koru">Koru</option>
              <option value="Hook">Hook</option>
            </select>
          </div>
          <div className="form-group">
            <label for="sizeSelect">Size</label>
            <select className="form-control" id="sizeSelect">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="form-group">
            <label for="amountInput">Amount</label>
            <input type="text" className="form-control" id="amountInput" placeholder="" value={this.state.amount} />
          </div>
          <button id="b1" className="btn btn-secondary" type="button" onClick={this.addProduct}>Add Product</button>
        </form>

        <br />

        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.state.products}
          columns={this.state.columns} />

        <button type="submit" className="btn btn-primary float-right">Save</button>
      </div>
    );
  }
}

export default NewProduct;
