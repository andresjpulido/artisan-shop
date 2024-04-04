import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  getOrder,
  updateOrder,
  UPD_ORDER,
} from "../../redux/actions/orderActions";
import { readAllProductTypes } from "../../redux/actions/productTypeActions";
import { readAllCustomer } from "../../redux/actions/customerActions";
import { readAll, create, del } from "../../redux/actions/noteActions";
import { readAllEmployee } from "../../redux/actions/employeeActions";
import { useHistory } from "react-router-dom";
import { ALERT } from "../../redux/constants/ActionTypes";
import AutoComplete from "../../components/AutoComplete";
import Products from "../components/products";
import NoteList from "../components/notesList";
import DepositList from "../components/depositsList";
import { toDate, toInputDate } from "../../utils/formatters";
import EditProduct from "../components/editProduct";

export default function Order(props) {
  const { id } = useParams();
  const [showProduct, setShowProduct] = useState(false);
  const productTypes = useSelector(
    (state) => state.productTypeReducer.productTypes
  );
  const notes = useSelector((state) => state.noteReducer.notes);

  let order = useSelector((state) => state.orderReducer.order);
  const employees = useSelector((state) => state.employeeReducer.employees);
  const customers = useSelector((state) => state.customerReducer.customers);
  const [form, setForm] = useState({ username: "", keyword: "" });

  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ALERT, payload: null });
    dispatch(readAllProductTypes());

    if (id) {
      dispatch(getOrder(id));
      dispatch(readAll({ id_order: Number(id) }));
    } else {
      //TODO redireccionar a la pagina principal de las ordenes
    }
  }, [id]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (id) {
      //await dispatch(createOrder(order));
      console.log("updating order ", id);
      order = { ...order, id: id };
      dispatch(updateOrder(order));
    } else {
      dispatch(createOrder(order));
    }
  };

  const handleNewCustomer = (ev) => {
    ev.preventDefault();
    history.push("/customer");
  };

  const handleChangeForm = (ev) => {
    ev.persist();
    const target = ev.target;
    const value = target.value;
    const name = target.name;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleChange = (ev) => {
    ev.persist();
    dispatch({
      type: UPD_ORDER,
      payload: { ...order, [ev.target.name]: ev.target.value },
    });
  };

  const addProduct = () => {
    let products = order.products;
    if (!products) products = [];
    products.push({ id_productType: "1", description: "" });

    dispatch({ type: UPD_ORDER, payload: { ...order, products: products } });
  };

  const updateField = (
    fieldText,
    valueText,
    fieldId,
    valueId,
    update = true
  ) => {
    if (update) {
      let queryObj = {
        firstName: valueText,
        lastName: valueText,
        autocomplete: true,
      };
      dispatch(readAllCustomer(queryObj));
    } else {
      console.log("actualizando id_customer", valueId);
      dispatch({
        type: UPD_ORDER,
        payload: { ...order, id_customer: valueId },
      });
    }
    setForm((form) => ({ ...form, [fieldText]: valueText }));
    setForm((form) => ({ ...form, [fieldId]: valueId }));
  };

  const showProductHandler = (e) => {
    setShowProduct(!showProduct);
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      {id && <h4>Order #{id}</h4>}
      {!id && <h4>New Order</h4>}

      <form onSubmit={handlesubmit}>
        <br />
        <div className="card">
          <div class="card-header">
            <strong>Customer</strong>
          </div>

          <div className="card-body">
            {order.customer && (
              <div className=" ">
                <h6>
                  {order.customer.firstName} {order.customer.lastName}
                </h6>
                <h6>{order.customer.phoneNumbers}</h6>
                <h6>{order.customer.email}</h6>
              </div>
            )}

            <div className="mb-3 row">
              <label htmlFor="nameInput" className="col-sm-2 col-form-label">
                Name:
              </label>
              <div className="col-sm-10 form-control">
                <AutoComplete
                  results={customers}
                  keyword={form.keyword}
                  updateField={updateField}
                />
              </div>
            </div>
            <button
              id="b1"
              className="btn btn-outline-primary float-right"
              type="button"
              onClick={handleNewCustomer}
            >
              Create new
            </button>
          </div>
        </div>
        <br />
        <div className="card">
          <div class="card-header">
            <strong>Products</strong>
          </div>
          <div className="card-body">
            {JSON.stringify(order)}
            <Products orderId={order.id} />

            <button
              id="b1"
              className="btn btn-outline-primary float-right"
              type="button"
              onClick={showProductHandler}
            >
              More
            </button>

            {showProduct && <EditProduct orderId={order.id} />}

            <div className="form-group">
              <label htmlFor="photos"></label>
            </div>
          </div>
          s
        </div>
        <br />
        <div className="card">
          <div className="card-header">
            <strong>Delivery</strong>
          </div>
          <div className="card-body">
            <div className="mb-3 row">
              <label htmlFor="deliveryDate" className="col-sm-2 col-form-label">
                Estimated Delivery date:
              </label>

              <input
                type="date"
                className="col-sm-10 form-control"
                id="deliveryDate"
                name="deliveryDate"
                placeholder=""
                value={toInputDate(order.deliveryDate)}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Order description:
              </label>

              <textarea
                type="text"
                className="col-sm-10 form-control"
                id="description"
                name="description"
                placeholder=""
                value={order.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 row">
              <label htmlFor="price" className="col-sm-2 col-form-label">
                Price:
              </label>

              <input
                type="text"
                className="col-sm-10 form-control"
                id="price"
                name="price"
                placeholder="Price"
                value={order.price}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <br />

        <div className="card">
          <div className="card-header ">
            <div>
              <strong>Notes</strong>
            </div>
          </div>

          <div className="card-body">
            <NoteList orderId={id} />

            <div className="mb-3 row">
              <label htmlFor="note" className="col-sm-2 col-form-label">
                Comment:
              </label>
              <textarea
                type="text"
                className="col-sm-10 form-control"
                id="note"
                name="note"
                placeholder="Add a comment ..."
                value={form.note}
                onChange={handleChangeForm}
              />
            </div>
            <button
              type="button"
              className="btn btn-outline-primary float-right"
              onClick={() => {
                //add note to order
                dispatch(create({ id_order: id, content: form.note }));

                //clean form
                setForm((form) => ({ ...form, note: "" }));

                dispatch(readAll({ id_order: Number(id) }));
              }}
            >
              Add Note
            </button>
            <br />
          </div>
        </div>

        <br />

        <div className="card">
          <div className="card-header">
            <strong>Balance</strong>
          </div>
          <div className="card-body">
            <DepositList orderId={id} price={order.price} />

            <div className="mb-3 row">
              <label htmlFor="deposit" className="col-sm-2 col-form-label">
                Amount:
              </label>

              <input
                type="text"
                className="col-sm-10 form-control"
                id="deposit"
                name="deposit"
                placeholder="Add a comment..."
                value={order.description}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-outline-primary float-right"
              onClick={() => {
                history.push("/orders");
              }}
            >
              Add Deposit
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Mark as a done and close the order.
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        </div>
        <br />
        <br />
        <br />
        <button
          type="button"
          className="btn btn-primary float-left"
          onClick={() => {
            history.push("/orders");
          }}
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary float-right">
          Save
        </button>
      </form>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
