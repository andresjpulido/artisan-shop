import React, { useEffect, useState } from 'react';
import { createProduct, updateProduct, readOneProduct, UPD_PRODUCT, NEW_PRODUCT } from '../redux/actions/productActions'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ALERT } from '../redux/constants/ActionTypes';
import { getSizes } from '../redux/actions/sizeActions';
import { readAllProductTypes } from '../redux/actions/productTypeActions';
import { readAllLocations } from '../redux/actions/locationActions';
import Barcode from 'react-barcode';

export default function Product() {

    const product = useSelector(state => state.productReducer.product)
    const sizes = useSelector(state => state.sizeReducer.sizes)
    const productTypes = useSelector(state => state.productTypeReducer.productTypes)
    const locations = useSelector(state => state.locationReducer.locations)

    const [amount, setamount] = useState(1)
    const dispatch = useDispatch();
    let history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: ALERT, payload: null })
        dispatch(getSizes());
        dispatch(readAllProductTypes())
        dispatch(readAllLocations())

        if (id) {
            dispatch(readOneProduct(id));
        }
        else {
            dispatch({ type: NEW_PRODUCT, payload: null })
        }

    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id)
            dispatch(updateProduct(product))
        else
            dispatch(createProduct(product))
    }

    const goback = () => {
        dispatch({ type: ALERT, payload: null })
        history.push("/products")
    }

    const handleChange = (ev) => {
        ev.persist();
        dispatch({ type: UPD_PRODUCT, payload: { ...product, [ev.target.name]: ev.target.value } })
    }

    const handleChangeAmount = (ev) => {
        ev.persist();
        setamount(ev.target.value)
    }

    return (
        <div className="container">

            <br /><br /><br />
            <h4>Product</h4>

            <form>

                <div className="form-group">
                    <label htmlFor="id_productType">ProductType</label>
                    <select className="form-control" id="id_productType" name="id_productType"
                        onChange={handleChange} value={product.id_productType} >
                        {productTypes.map((item, index) => <option key={index}
                            value={item.id}>{item.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" className="form-control" id="amount" name="amount" placeholder="Amount"
                        value={amount} onChange={handleChangeAmount} />
                </div>

                <div className="form-group">
                    <label htmlFor="id_size">Size</label>
                    <select className="form-control" id="id_size" name="id_size"
                        onChange={handleChange} value={product.id_size} >
                        {sizes.map((item, index) => <option key={index}
                            value={item.id}>{item.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="id_location">Location</label>
                    <select className="form-control" id="id_location" name="id_location"
                        onChange={handleChange} value={product.id_location} >
                        {locations.map((item, index) => <option key={index}
                            value={item.id}>{item.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Description"
                        value={product.description} onChange={handleChange} />
                </div>

                {
                    product.code && product.code !== 'DEFAULT' &&
                    <div className="form-group">
                        <label htmlFor="description">BarCode</label>
                        <br />
                        <Barcode value={product.code} />
                    </div>
                }

                <div className="btn-toolbar justify-content-between">
                    <button type="button" className="btn btn-primary float-left" onClick={goback}>Back</button>
                    <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Save</button>
                </div>

            </form>

        </div>
    );
}