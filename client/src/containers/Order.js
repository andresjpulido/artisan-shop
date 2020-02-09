import React, { Component } from 'react';

class Order extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/student')
  }

  render() {
    return (
      <div className="container">

        <br /><br /><br />
        <h4>New Order</h4>

        <form>
        <div className="form-group">
          <label for="nameInput">Name</label>
          <input type="text" className="form-control" id="nameInput" placeholder="Name" />
        </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@domain.com" />
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect1">Product</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>Toki</option>
              <option>Manaia</option>
              <option>Koru</option>
              <option>Hook</option>
              <option>restoration</option>
            </select>
          </div>
          <div className="form-group">
            <label for="record">Record</label>
            <input type="text" className="form-control" id="record" placeholder="" />
          </div>
          <button id="b1" className="btn btn-secondary" type="button">Add Product</button>
          <div className="form-group">
            <label for="exampleFormControlSelect2">Amount</label>
            <input type="text" className="form-control" id="exampleFormControlSelect2" placeholder="" />
          </div>
          <button id="b1" className="btn btn-secondary" type="button">Add Product</button>
        </form>
        <button type="submit" className="btn btn-primary float-right">Save</button>
      </div>
    );
  }
}

export default Order;
