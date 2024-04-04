import { GET_ORD_OP, CREATE_ORDER, GET_ORDER, UPD_ORDER } from '../actions/orderActions';
import { SHOW_ERRORS } from '../actions/errorActions';  
import {getdate} from '../../utils/formatters'

  const initialState = { 
    orders: [], 
    error:{}, 
    order: {products:[{images:[], id_productType:1, description:""}], description:"", deliveryDate:getdate()}
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

        case GET_ORDER:
          return {
            ...state,
            pending: false,
            error: action.error,
            order: action.payload,
          }

        case CREATE_ORDER:
          return {
            ...state,
            pending: false,
            error: action.error,
            order: action.payload,
          }

        case SHOW_ERRORS:
          console.log("action.error ::: ",action.error)
          return {
            ...state, 
            error: action.error
          } 

          case UPD_ORDER:
            return {
              ...state,
              order: action.payload,
            }

        default:
          return { ...state }
      }
    }
     
    export const getOrders = state => state.orders;    
    export const createOrders = state => state.orders;    