import { readAllProduct } from "../../redux/actions/productActions";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ALERT } from "../../redux/constants/ActionTypes";
import { readAllProductTypes } from "../../redux/actions/productTypeActions";

export default function editProduct(props) {
  const orderId = props.orderId;
  const [product, setProduct] = useState({
    id_order: orderId,
    images: [],
    files: [],
  });
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

  const addImages = (ev) => {
    const files = Array.from(ev.target.files);

    files.forEach((file, i) => {
      product.images.push({
        fileName: file.name,
        mimeType: file.type,
        description: file.size + " " + file.lastModifiedDate,
        file: file,
        data: i,
      });

      //dispatch({ type: UPD_ORDER, payload: { ...order, products: products } });
    });
  };

  useEffect(() => {
    dispatch({ type: ALERT, payload: null });
    dispatch(readAllProductTypes());

    if (orderId) {
    } else {
    }
  }, [orderId]);

  if (!products) {
    return <div>No products</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3 row">
          <label htmlFor="product" className="col-sm-2 col-form-label">
            Product
          </label>
          <select
            className="col-sm-10 form-control"
            id="id_productType"
            name="id_productType"
            onChange={(e) => handleProductChange(e, 1)}
            value={product.id_productType}
          >
            {productTypes &&
              productTypes.map((itempt, indexpt) => (
                <option key={indexpt} value={itempt.id}>
                  {itempt.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3 row">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            Product description
          </label>
          <textarea
            type="text"
            className="col-sm-10 form-control"
            id="description"
            name="description"
            placeholder=""
            onChange={(e) => handleProductChange(e)}
            value={product.description}
          />
        </div>

        <div className="row">
          {product &&
            product.images.map((img, index) => {
              if (img.file)
                return (
                  <div key={index}>
                    <img src={URL.createObjectURL(img.file)} alt="pic"></img>
                  </div>
                );
              else
                return (
                  <div key={index}>
                    <img width="90px" src={img.url} alt={img.url}></img>
                  </div>
                );
            })}
        </div>

        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="imgfiles"
            name="imgfiles"
            onChange={(e) => addImages(e)}
            multiple
            value={product.files}
          />
          <label className="custom-file-label" htmlFor="imgfiles">
            Choose file
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary float-right">
        Save
      </button>
      <br />
    </div>
  );
}
