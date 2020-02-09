import { GET_MOVEMENT, WEEKLY_REPORT } from '../actions/movementsActions';
import { SHOW_ERRORS } from '../actions/errorActions';  

  const initialState = { 
    movements: [], 
    weeklyMovements: [],
    error:{}
  }
     
  export default (state = initialState, action) => {
    switch (action.type) {
       
      case GET_MOVEMENT:
        return {
          ...state,
          pending: false,
          error: action.error,
          movements: action.payload,
        }
 

      case SHOW_ERRORS:
        console.log("action.error ::: ",action.error)
        return {
          ...state, 
          error: action.error
        }          
      
      case WEEKLY_REPORT:
        console.log("action.error ::: ",action.error)
        return {
          ...state, 
          weeklyMovements: action.payload,
        }         
        
      default:
        return { ...state }
    }
  }
   
  export const getMovements = state => state.movements;
  export const weeklyReport = state => state.weeklyMovements;
   