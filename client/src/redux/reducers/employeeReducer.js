import { FETCH_EMPLOYEES_PENDING, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_ERROR, 
  FETCH_EMPLOYEES, CREATE_EMP, GET_EMPLOYEE }
  from '../actions/employeeActions';

const initialState = {
  pending: false,
  employees: [],
  employee: {},
  error: null,
  test: "ok"
}

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCH_EMPLOYEES_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_EMPLOYEES_SUCCESS:
      console.log("FETCH_EMPLOYEES_SUCCESS:", action.employees)
      return {
        ...state,
        pending: false,
        employees: action.payload.employees,
        test: "no ok"
      }
    case FETCH_EMPLOYEES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        employees: action.payload
      }

    case FETCH_EMPLOYEES:
      return {
        ...state,
        pending: false,
        error: action.error,
        employees: action.payload,
      }

      case CREATE_EMP:
        return {
          ...state,
          pending: false,
          error: action.error,
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


export const getAllEmployees = state => state.employees;
export const getEmployeesPending = state => state.pending;
export const getEmployeesError = state => state.error;
export const createEmployee = state => state.employee;
