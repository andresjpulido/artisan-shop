import { GET, UPD, DEL, ADD } from "../actions/noteActions";

const initialState = {
  notes: [],
  note: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        notes: action.payload,
      };

    case ADD:
      return {
        ...state,
        note: initialState.employee,
      };

    case UPD:
      return {
        ...state,
        note: action.payload,
      };

    case DEL:
      return {
        ...state,
        note: action.payload,
      };

    default:
      return { ...state };
  }
};
