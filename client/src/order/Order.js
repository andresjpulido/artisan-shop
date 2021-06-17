import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, getOrder, UPD_ORDER } from '../redux/actions/orderActions'
import { useHistory } from "react-router-dom";
import { ALERT } from '../redux/constants/ActionTypes';

export default function Order(props) {

  const { id } = useParams();

  const order = useSelector(state => state.orderReducer.order)
  let history = useHistory()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ALERT, payload: null })
    if (id)
      dispatch(getOrder(id))
  }, [id])

  const handlesubmit = async (e) => {
    e.preventDefault();
    await dispatch(createOrder(order));
  }

  const handleNewCustomer = (ev) =>{
    ev.preventDefault();
    history.push("/customer")
  }

  const handleChange = (ev) => {
    ev.persist();
    dispatch({ type: UPD_ORDER, payload: { ...order, [ev.target.name]: ev.target.value } })
  }

  const handleProductChange = (ev, index) => {
    ev.persist();
    let products = order.products;
    products[index][ev.target.name] = ev.target.value;

    dispatch({ type: UPD_ORDER, payload: { ...order, products: products } })
  }

  const remProduct = () => {
    let products = order.products
    if (order && order.products.length > 0)
      products.pop()
    dispatch({ type: UPD_ORDER, payload: { ...order, products: products } })
  }

  const addProduct = () => {
    let products = order.products
    if (!products) products = []
    products.push({ "id_productType": "1", "description": "" })

    dispatch({ type: UPD_ORDER, payload: { ...order, products: products } })

  }

  const addImages = (ev, index) => {

    const files = Array.from(ev.target.files)

    let products = order.products;
    if (!products[index].images)
      products[index].images = []

    files.forEach((file, i) => {

      let products = order.products;
      products[index].images.push(
        {
          fileName: file.name,
          mimeType: file.type,
          description: file.size + " " + file.lastModifiedDate,
          file: file,
          data: i
        }
      );

      dispatch({ type: UPD_ORDER, payload: { ...order, products: products } })

    })



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
              <input type="email" className="form-control" id="email" placeholder="name@domain.com" onChange={handleChange} />
            </div>

          </div>
        </div>

        <h5>Customer</h5>
        <div className="card card-body">
          <div className="form-group">
            <label htmlFor="nameInput">Name</label>
            <input type="text" className="form-control" id="nameInput" placeholder="Name" />
          </div>
          <div className="form-group">
          <button id="b1" className="btn btn-link float-right" type="button" onClick={handleNewCustomer}>Create new</button>
          </div>
        </div>

        <h5>Products</h5>

        {
          order &&
          order.products &&
          order.products.map((item, productIndex) => {
            return (
              <div className="card card-body" key={productIndex}>
                <div className="form-group">
                  <label htmlFor="product">Product</label>
                  <select className="form-control" id="id_productType" name="id_productType"
                    onChange={(e) => handleProductChange(e, productIndex)} value={item.id_productType} >
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
                    placeholder="" onChange={(e) => handleProductChange(e, productIndex)} value={item.description} />
                </div>

                <div className="form-group">

                  {
                    item.images && item.images.map((img, index) => {
                      if (img.file)
                        return (<div key={index}><img className="img-fluid" src={URL.createObjectURL(img.file)} alt="pic"></img></div>)
                      else
                        return (<div key={index}><img className="img-fluid" src={img.url} alt={img.url}></img></div>)
                    })
                  }
                </div>

                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="multifile" name="multifile" onChange={(e) => addImages(e, productIndex)} multiple value={item.files} />
                  <label className="custom-file-label" htmlFor="multifile">Choose file</label>
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
          <label htmlFor="deliveryDate">Delivery date</label>
          <input type="date" className="form-control" id="deliveryDate" name="deliveryDate" placeholder=""
            value={order.deliveryDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Order description</label>
          <textarea type="text" className="form-control" id="description" name="description" placeholder=""
            value={order.description} onChange={handleChange} />
        </div>

        <button type="button" className="btn btn-primary float-left" onClick={() => { history.push("/orders") }}>Back</button>
        <button type="submit" className="btn btn-primary float-right">Save</button>

      </form>



    </div >
  );

}
