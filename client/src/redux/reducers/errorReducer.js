import { SHOW_ERRORS } from '../actions/errorActions';

  const initialState = {
    
  }
     
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case SHOW_ERRORS:
        return {
          ...state,           
          error: action.error,           
        }
 
      default:
        return { ...state }
    }
  }
   

  
  export const showErrors = state => state.errors; 