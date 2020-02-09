import {GET_PAYSLIPS, FETCH_PAYSLIPS_SUCCESS, FETCH_PAYSLIPS_ERROR} 
from '../actions/payslipActions';

  const initialState = {
    pending: false,
    payslips: [],
    error: null,
    test:"ok"
  }
      
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case GET_PAYSLIPS: 
 
        return {
            ...state,
            pending: false,
            payslips: action.payload,
        }
      case FETCH_PAYSLIPS_SUCCESS:
          return {
              ...state,
              pending: false,
              payslips: action.payload.payslips,
              test:"no ok"
          } 
      case FETCH_PAYSLIPS_ERROR:
          return {
              ...state,
              pending: false,
              error: action.error,
              payslips: []
          }
         
      default:
        return {...state}

    }
  }
  
  export const getPayslips = state => state.payslips;
  export const getPayslipsPending = state => state.pending;
  export const getPayslipsError = state => state.error;
