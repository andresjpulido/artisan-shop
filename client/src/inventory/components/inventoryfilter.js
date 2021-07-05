import React, { useEffect, useState } from 'react';
import { createProduct, updateProduct, readOneProduct, UPD_PRODUCT, NEW_PRODUCT } from '../../redux/actions/productActions'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ALERT } from '../../redux/constants/ActionTypes';
import { getSizes } from '../../redux/actions/sizeActions';
import { readAllProductTypes } from '../../redux/actions/productTypeActions';
import { readAllLocations } from '../../redux/actions/locationActions';

export default function InventoryFilter(props) {

    const product = useSelector(state => state.productReducer.product)
    const sizes = useSelector(state => state.sizeReducer.sizes)
    const productTypes = useSelector(state => state.productTypeReducer.productTypes)
    const locations = useSelector(state => state.locationReducer.locations)

    const [form, setForm] = useState({ id_productType: "0", id_size: "0", id_location: "0" })

    const [amount, setamount] = useState(1)
    const dispatch = useDispatch();
    let history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: ALERT, payload: null })
        dispatch(getSizes());
        dispatch(readAllProductTypes())
        dispatch(readAllLocations()) 
    }, [id])

    const handleSubmit = (ev) => {
        ev.preventDefault();
        props.action(form)
    }

    const handleChange = (ev) => {
        ev.persist();
        setForm(form => ({ ...form, [ev.target.name]: ev.target.value }));
    }


    return (

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="id_productType">ProductType</label>
                <select className="form-control" id="id_productType" name="id_productType"
                    onChange={handleChange} value={form.id_productType} >
                    <option value="0">All</option>
                    {productTypes.map((item, index) => <option key={index}
                        value={item.id}>{item.name}</option>)}
                </select>
            </div>


            <div className="form-group">
                <label htmlFor="id_size">Size</label>
                <select className="form-control" id="id_size" name="id_size"
                    onChange={handleChange} value={form.id_size} >
                    <option value="0">All</option>
                    {sizes.map((item, index) => <option key={index}
                        value={item.id}>{item.name}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="id_location">Location</label>
                <select className="form-control" id="id_location" name="id_location"
                    onChange={handleChange} value={form.id_location} >
                    <option value="0">All</option>
                    {locations.map((item, index) => <option key={index}
                        value={item.id}>{item.name}</option>)}
                </select>
            </div>

            <div className="btn-toolbar justify-content-between">
                <button type="submit" className="btn btn-primary float-right" >Save</button>
            </div>
        </form>

    )
}