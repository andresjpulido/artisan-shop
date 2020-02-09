import {SIGNIN, SIGNIN_ERROR} from "../actions/authAction"

const initialState = {
    user : {},
    error : {}
}

export default (state = initialState, action) => {

    switch (action.type) {
      
        case SIGNIN: { 
            return Object.assign({}, state, {user: action.payload})
        } 
   
        case SIGNIN_ERROR: { 
            return Object.assign({}, state, {user:{},error: action.error})
        } 

        default:{
            //return Object.assign({}, state, {user: {}})      
            return { ...state }
        }
    }
}
