import { GET_PRODUCTTYPE, GET_PRODUCTTYPES, CREATE_PRODUCTTYPE, DEL_PRODUCTTYPE, UPD_PRODUCTTYPE } from '../actions/productTypeActions';

  const initialState = {
    productTypes: [] ,
    productType: { name:"", description:""}
  }
     
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case GET_PRODUCTTYPES:
        return {
          ...state,
          pending: false,
          error: action.error,
          productTypes: action.payload,
        }

        case GET_PRODUCTTYPE:
          console.log(action.payload)
          return {
            ...state,
            pending: false,
            error: action.error,
            productType: action.payload,
          }

      case CREATE_PRODUCTTYPE:
        return {
          ...state,
          pending: false,
          error: action.error, 
          productType: action.payload
        } 

        case DEL_PRODUCTTYPE:
          return {
            ...state, 
            productTypes: action.payload
          }

          case UPD_PRODUCTTYPE:
            return {
              ...state,
              productType: action.payload,
            }

      default:
        return { ...state }
    }
  }
   

  
  export const getAllproductTypes = state => state.productTypes;   
  export const create = state => state.productType; 