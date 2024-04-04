import { GET_LOCATIONS, NEW_LOCATION, UPD_LOCATION, GET_LOCATION, ADD_LOCATION } from '../actions/locationActions';

const initialState = {
  locations: [],
  location: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      }

    case NEW_LOCATION:
      return {
        ...state,
        location: initialState.employee
      }

    case UPD_LOCATION:
      return {
        ...state,
        location: action.payload
      }

    case ADD_LOCATION:
      return {
        ...state,
        location: action.payload,
      }

    case GET_LOCATION:
      return {
        ...state,
        location: action.payload
      }

    default:
      return { ...state }
  }

}