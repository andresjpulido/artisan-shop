import { GET_PRODUCTTYPE, CREATE_PRODUCTTYPE } from '../actions/productTypeActions';

  const initialState = {
    productTypes: [] ,
    productType: { name:""},
    pending: false,
    error: null
  }
     
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case GET_PRODUCTTYPE:
        return {
          ...state,
          pending: false,
          error: action.error,
          productTypes: action.payload,
        }

      case CREATE_PRODUCTTYPE:
        return {
          ...state,
          pending: false,
          error: action.error, 
          productType: action.payload
        } 

      default:
        return { ...state }
    }
  }
   

  
  export const getAllproductTypes = state => state.productTypes;   
  export const create = state => state.productType; 