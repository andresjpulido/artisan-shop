import { GET_USERS, CREATE_USER, GET_USER, NEW_USER, UPD_USER } from '../actions/userActions';

const initialState = {
  users: [], 
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_USERS:
      return {
        ...state,  
        users: action.payload,
      }

    case CREATE_USER:
      return {
        ...state,  
        user: action.payload,
      }

    case GET_USER:
      return {
        ...state, 
        user: action.payload,
      }

    case NEW_USER:
      return {
        ...state,
        user: initialState.user,
      }

    case UPD_USER:
      return {
        ...state,
        user: action.payload,
      }

    default:
      return { ...state }
  }
}