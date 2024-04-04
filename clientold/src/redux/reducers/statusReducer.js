import { GET_STATUS } from '../actions/statusActions';
 
  const initialState = { 
    statusList: [], 
    error:{}, 
    status: {name:""}
  }
     
  export default (state = initialState, action) => {
    switch (action.type) {
       
      case GET_STATUS:
        return {
          ...state,
          pending: false,
          error: action.error,
          statusList: action.payload,
        }

       
        

        default:
          return { ...state }
      }
    }
     
    export const getStatusList = state => state.statusList;