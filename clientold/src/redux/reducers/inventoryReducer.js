import { GET_INVENTORY, GET_MOVEMENT, CREATE_MOV }
  from '../actions/inventoryActions';
import { SHOW_ERRORS } from '../actions/errorActions';  

  const initialState = {
    inventory: [],
    movements: [],
    movement: {},
    error:{}
  }
     
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case GET_INVENTORY:
        return {
          ...state,
          pending: false,
          error: action.error,
          inventory: action.payload,
        }

      case GET_MOVEMENT:
        return {
          ...state,
          pending: false,
          error: action.error,
          movements: action.payload,
        }

      case CREATE_MOV:
       
        return {
          ...state,
          pending: false,
          error: action.error,
          movement: action.payload,
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
   

  
  export const getAll = state => state.inventory;
  export const getAllMovements = state => state.movements;
  export const newMovement = state => state.newMovement;