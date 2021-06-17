import { SIGNIN_URL } from '../constants/webservices'
import ActionUtility from './utilAction';

export const SIGNIN = "SIGNIN"

export default function signIn(requestObj) {
  return (dispatch, getState) => {
    ActionUtility.invokeServicePost(dispatch, SIGNIN, requestObj, SIGNIN_URL);
    
  }
}