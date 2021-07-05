import { GET_PRODUCTS, UPD_PRODUCT, ADD_PRODUCT, GET_PRODUCT, NEW_PRODUCT } from '../actions/productActions';

const initialState = {
  products: [],
  product: {
    id_productType: 1, id_size: 1, amount: 0, description: "", code:"DEFAULT", id_location: 1
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case NEW_PRODUCT:
      return {
        ...state,
        product: initialState.product
      }

    case UPD_PRODUCT:
      return {
        ...state,
        product: action.payload
      }

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }

    case ADD_PRODUCT:
      return {
        ...state,
        product: action.payload,
      }

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      }

    default:
      return { ...state }
  }

}