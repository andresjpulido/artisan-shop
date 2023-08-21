import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import { createOrder, getOrder } from '../../redux/actions/orderActions'

function Order(props) {

  const { id } = useParams();
 
  const [form, setForm] = useState({ id_customer: 1, products: [] })
  const dispatch = useDispatch();

  useEffect(() => {
    if (id)
      props.getOrder(id)
       
  }, [id])

console.log(props.order)
if(props.order){
  //setForm(props.order );
}

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit ")
    await dispatch(createOrder(form));
  }

  const handleChange = (ev) => {
    ev.persist();
    setForm(form => ({ ...form, [ev.target.name]: ev.target.value }));
  }

  const handleProductChange = (ev, index) => {
    ev.persist();
    let products = form.products
    products[index][ev.target.name] = ev.target.value
    setForm(form => ({ ...form, "products": products }));
  }

  const remProduct = () => {
    let products = form.products
    products.pop()
    setForm(form => ({ ...form, "products": products }));
  }

  const addProduct = () => {
    let products = form.products
    products.push({ "idProduct": "1" })
    setForm(form => ({ ...form, "products": products }));
    console.log(form.products)
  }


  return (
    <div className="container">

      <br /><br /><br />
      <h4>New Order</h4>

      <form onSubmit={handlesubmit}>
        <p>
          <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Customer
          </a>

        </p>
        <div className="collapse" id="collapseExample">
          <div className="card card-body" >


            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input type="text" className="form-control" id="nameInput" placeholder="Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="name@domain.com" value={form.email} onChange={handleChange} />
            </div>

          </div>
        </div>

        <h5>Products</h5>

        {
          form.products&& 
          form.products.map((item, index) => {
            return (
              <div className="card card-body" key={index}>
                <div className="form-group">
                  <label htmlFor="product">Product</label>
                  <select className="form-control" id="idProduct" name="idProduct"
                    onChange={(e) => handleProductChange(e, index)} value={item.idProduct} >
                    <option value="1">Toki</option>
                    <option value="2">Manaia</option>
                    <option value="3">Koru</option>
                    <option value="4">Hook</option>
                    <option value="5">Another</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Product description</label>
                  <textarea type="text" className="form-control" id="description" name="description"
                    placeholder="" onChange={(e) => handleProductChange(e, index)} value={item.description} />
                </div>

                <div className="form-group">
                  <label htmlFor="photos"></label>
                  <button id="photos" className="btn btn-secondary" type="button">Add photos</button>
                </div>
              </div>
            )
          }
          )
        }



        <div className="form-group">
          <label htmlFor="photos"></label>
          <button id="b1" className="btn btn-secondary float-right" type="button" onClick={remProduct}>-</button>

          <button id="b1" className="btn btn-secondary float-right" type="button" onClick={addProduct}>+</button>
        </div>

        <div className="form-group">
          <label htmlFor="deliveryDate">Date</label>
          <input type="date" className="form-control" id="deliveryDate" name="deliveryDate" placeholder=""
            value={form.deliveryDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Order description</label>
          <textarea type="text" className="form-control" id="description" name="description" placeholder=""
            value={form.description} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary float-right">Save</button>

      </form>



    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    error: state.generalReducer.error,
    pending: state.generalReducer.pending,
    order: state.orderReducer.order
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createOrder: createOrder
  , getOrder
}, dispatch)

export default (connect(mapStateToProps, mapDispatchToProps))(Order);