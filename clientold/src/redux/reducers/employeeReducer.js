import { GET_EMPLOYEES, UPD_EMPLOYEE, ADD_EMPLOYEE, GET_EMPLOYEE, NEW_EMPLOYEE } from '../actions/employeeActions';
import { getdate } from '../../utils/formatters'

const initialState = {
  employees: [],
  employee: {
    firstName: "", lastName: "", movil: "", email: "", address: "", ird: "", document: "", position: "0", bankName: "", accountNumber: "", birthDate: getdate()
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case NEW_EMPLOYEE:
      return {
        ...state,
        employee: initialState.employee
      }

    case UPD_EMPLOYEE:
      return {
        ...state,
        employee: action.payload
      }

    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      }

    case ADD_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
      }

    case GET_EMPLOYEE:
      return {
        ...state,
        employee: action.payload
      }

    default:
      return { ...state }
  }

}