import shop from '../../api/shop'
import * as types from '../constants/ActionTypes'
/*
const receiveActiveEmployees = employees => ({
  type: types.GET_ACT_EMP,
  employees
})

export const getActiveEmployees = () => dispatch => {
  
  shop.getActiveEmployees(employees => {
    dispatch(receiveActiveEmployees(employees))
    console.log("invocando servicio que obtiene los empleados")
  })
}


const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
*/