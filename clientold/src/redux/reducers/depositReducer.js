import { GET, UPD, DEL, ADD } from "../actions/depositActions";

const initialState = {
  deposits: [],
  deposit: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        deposits: action.payload,
      };

    case ADD:
      return {
        ...state,
        deposit: initialState.employee,
      };

    case UPD:
      return {
        ...state,
        deposit: action.payload,
      };

    case DEL:
      return {
        ...state,
        deposit: action.payload,
      };

    default:
      return { ...state };
  }
};
