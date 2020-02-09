import { GET_ORD_OP } from '../actions/orderActions';
import { SHOW_ERRORS } from '../actions/errorActions';  

  const initialState = { 
    orders: [], 
    error:{}
  }
     
  export default (state = initialState, action) => {
    switch (action.type) {
       
      case GET_ORD_OP:
        return {
          ...state,
          pending: false,
          error: action.error,
          orders: action.payload,
        }

        case SHOW_ERRORS:
          console.log("action.error ::: ",action.error)
          return {
            ...state, 
            error: action.error
          } 

        default:
          return { ...state }
      }
    }
     
    export const getOrders = state => state.orders;     