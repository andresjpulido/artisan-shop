import { FETCH_PRODUCTION_REPORT } from '../actions/reportActions';

const initialState = {
    pending: false,
    report: {},
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_PRODUCTION_REPORT:
            return {
                ...state,
                report: action.payload
            }

        default:
            return { ...state }
    }
}


export const getProductionReport = state => state.report;
