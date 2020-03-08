import {PENDING, FINISHED, SHOW_ERRORS} from '../constants/ActionTypes'

  const initialState = {
    pending: false,
    error: ""
  }
     
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case SHOW_ERRORS:
        return {
          ...state,           
          error: action.error,           
        }

      case PENDING:
        return {
          ...state,           
          pending: true           
        }        
 
      case FINISHED:
        return {
          ...state,           
          pending: false           
        } 

      default:
        return { ...state }
        
    }
  }
   

  
  export const showErrors = state => state.errors; 