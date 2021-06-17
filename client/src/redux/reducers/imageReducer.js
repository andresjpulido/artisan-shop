import { CREATE_IMAGES, GET_IMAGES } from '../actions/imageActions';

const initialState = {
  error: {},
  images: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_IMAGES:
      return {
        ...state,
        pending: false,
        error: action.error,
        images: action.payload,
      }

      case CREATE_IMAGES:
        return {
          ...state,
          pending: false,
          error: action.error
        }

    default:
      return { ...state }
  }
}

export const getImages = state => state.images;
export const createImage = state => state.image;