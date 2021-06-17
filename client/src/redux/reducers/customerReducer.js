import { GET_CUSTOMERS, CREATE_CUSTOMER, GET_CUSTOMER, NEW_CUSTOMER } from '../actions/customerActions';

const initialState = {
  customers: [], 
  customer: { firstName: "", lastName: "", phoneNumber: "", email: "" }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_CUSTOMERS:
      return {
        ...state,  
        customers: action.payload,
      }

    case CREATE_CUSTOMER:
      return {
        ...state,  
        customer: action.payload,
      }

    case GET_CUSTOMER:
      return {
        ...state, 
        customer: action.payload,
      }

    case NEW_CUSTOMER:
      return {
        ...state,
        customer: initialState.customer,
      }

    case "updatecustomer":
      return {
        ...state,
        customer: action.payload,
      }

    default:
      return { ...state }
  }
}

export const getCustomers = state => state.customers;
export const getCustomer = state => state.customer;