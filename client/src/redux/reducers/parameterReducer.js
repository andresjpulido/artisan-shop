import { GET_PARAMETERS } from '../actions/parameterActions';

  const initialState = {
    parameters: [] 
  }
     
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case GET_PARAMETERS:
        return {
          ...state,
          pending: false,
          error: action.error,
          parameters: action.payload,
        }
 
      default:
        return { ...state }
    }
  }
   

  
  export const getParameters = state => state.parameters;