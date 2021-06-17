import { GET_ROLES, CREATE_ROL, GET_ROL, NEW_ROL, UPD_ROL } from '../actions/rolActions';

const initialState = {
  roles: [],
  rol: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
      }

    case CREATE_ROL:
      return {
        ...state,
        rol: action.payload,
      }

    case GET_ROL:
      return {
        ...state,
        rol: action.payload,
      }

    case NEW_ROL:
      return {
        ...state,
        rol: initialState.rol,
      }

    case UPD_ROL:
      return {
        ...state,
        rol: action.payload,
      }

    default:
      return { ...state }
  }
}