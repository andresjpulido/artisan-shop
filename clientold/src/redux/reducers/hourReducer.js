import { GET_HOURS, ADD_HOUR, UPD_HOUR, GET_HOUR, NEW_HOUR } from '../actions/hourActions'
import { getdate } from '../../utils/formatters'

let initialState = {
  unpaidHours: [],
  hour: {
    start_date: getdate(),
    amount: "1",
    activity: ""
  }
}

export default (state = initialState, action) => {

  switch (action.type) {

    case NEW_HOUR:
      return {
        ...state,
        hour: initialState.hour
      }

    case GET_HOURS:
      return {
        ...state,
        unpaidHours: action.payload
      }

    case GET_HOUR:
      return {
        ...state,
        pending: false,
        error: action.error,
        hour: action.payload
      }

    case ADD_HOUR:
      return {
        ...state,
        pending: false,
        error: action.error,
        hour: action.payload
      }

    case UPD_HOUR:
      return {
        ...state,
        hour: action.payload,
      }

    default:
      return { ...state }

  }
}


export const getHour = state => state.hour;
