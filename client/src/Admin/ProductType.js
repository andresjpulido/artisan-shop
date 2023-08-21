import React, { useEffect } from "react";
import {
  createProductType,
  updateProductType,
  readOneProductType,
  UPD_PRODUCTTYPE,
} from "../redux/actions/productTypeActions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ALERT } from "../redux/constants/ActionTypes";

export default function ProductType() {
  const productType = useSelector(
    (state) => state.productTypeReducer.productType
  );

  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(readOneProductType(id));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) dispatch(updateProductType(productType));
    else dispatch(createProductType(productType));
  };

  const goback = () => {
    dispatch({ type: ALERT, payload: null });
    history.push("/Producttypes");
  };

  const handleChange = (ev) => {
    ev.persist();
    dispatch({
      type: UPD_PRODUCTTYPE,
      payload: { ...productType, [ev.target.name]: ev.target.value },
    });
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h4>Product type</h4>

      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={productType.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={productType.description}
            onChange={handleChange}
          />
        </div>
        <div className="btn-toolbar justify-content-between">
          <button
            type="button"
            className="btn btn-primary float-left"
            onClick={goback}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn btn-primary float-right"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>

      <br />
    </div>
  );
}
