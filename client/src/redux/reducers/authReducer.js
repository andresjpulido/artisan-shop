import {SIGNIN} from "../actions/authAction" 

const initialState = {
    user : {},
    error : {}
}

export default (state = initialState, action) => {

    switch (action.type) {
      
        case SIGNIN: { 
            return Object.assign({}, state, {user: action.payload})
        }  
        
        default:{       
            return { ...state }
        }
    }
}
