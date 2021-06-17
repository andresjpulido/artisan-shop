import { GET_RESOURCES } from '../actions/resourceActions';

const initialState = {
  resources: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_RESOURCES:
      return {
        ...state,
        resources: action.payload,
      }

    default:
      return { ...state }
  }

}