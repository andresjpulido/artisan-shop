import { GET_PRODUCTTYPE } from '../actions/productTypeActions';

  const initialState = {
    productTypes: [] 
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
 
      default:
        return { ...state }
    }
  }
   

  
  export const getAllproductTypes = state => state.productTypes; 