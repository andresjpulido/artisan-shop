import {GET_HOURS, ADD_HOUR} from '../actions/hourActions'
 
let initialState = {
  unpaidHours: [],
  hour: {}
}

export default (state = initialState, action) => {

  switch (action.type) {
   
    case GET_HOURS: 
    return {
      ...state,
      pending: false,
      error: action.error,
      unpaidHours: action.payload
    }
     
    case ADD_HOUR: 
    return {
      ...state,
      pending: false,
      error: action.error,
      hour: action.payload
    }

    default:
        return { ...state }

  }
}


//export const getHours = state => state.unpaidHours;
