import { SIGNIN } from "../actions/authAction";

const initialState = {
  auth: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN: {
      localStorage.setItem("session", action.payload.token);

      return {
        ...state,
        auth: {
          userid: action.payload.id,
          username: action.payload.username,
          lastlogin: action.payload.lastlogin,
          employee: action.payload.employee,
        },
      };
    }

    default: {
      return { ...state };
    }
  }
};
