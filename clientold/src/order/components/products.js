import { readAllProduct } from "../../redux/actions/productActions";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ALERT } from "../../redux/constants/ActionTypes";
import { readAllProductTypes } from "../../redux/actions/productTypeActions";

export default function products(props) {
  const orderId = props.orderId;
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productReducer.products);
  const productTypes = useSelector(
    (state) => state.productTypeReducer.productTypes
  );

  const handleProductChange = (ev, index) => {
    ev.persist();
    let products_ = products;
    products[index][ev.target.name] = ev.target.value;

    //dispatch({ type: UPD_ORDER, payload: { ...order, products: products } });
  };

  const addImages = (ev, index) => {
    const files = Array.from(ev.target.files);

    let products_ = products;
    if (!products_[index].images) products_[index].images = [];

    files.forEach((file, i) => {
      let products_ = products;
      products_[index].images.push({
        fileName: file.name,
        mimeType: file.type,
        description: file.size + " " + file.lastModifiedDate,
        file: file,
        data: i,
      });

      //dispatch({ type: UPD_ORDER, payload: { ...order, products: products } });
    });
  };

  const remProduct = () => {
    // dispatch({ type: UPD_ORDER, payload: { ...order, products: products } });
  };

  useEffect(() => {
    dispatch({ type: ALERT, payload: null });
    dispatch(readAllProductTypes());

    if (orderId) {
      dispatch(readAllProduct({ id_order: Number(orderId) }));
    } else {
      //TODO redireccionar a la pagina principal de las ordenes
    }
  }, [orderId]);

  if (!products) {
    return <div>No products</div>;
  }

  let productsList = products.map((item, productIndex) => {
    return (
      <div>
        <div className="card card-body" key={productIndex}>
          <h5>Cord Replacement</h5>
          <h6>
            {item.size.name} {item.productType.name}
            <button
              id="b1"
              className="btn btn-outline-danger float-right"
              type="button"
              onClick={remProduct}
            >
              -
            </button>
          </h6>
          <p>{item.description}</p>
          <div className="card card-body">
            <div className="row align-items-start">
              {item.images &&
                item.images.map((img, imgIndex) => (
                  <div key={imgIndex} className="col">
                    <img src={img.url} alt={img.description} width={"250px"} />
                    <p>
                      <small>{img.description}</small>
                    </p>
                    <button
                      id="b1"
                      className="btn btn-outline-danger float-right"
                      type="button"
                      onClick={remProduct}
                    >
                      -
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  });

  return productsList;
}
