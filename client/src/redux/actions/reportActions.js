import { PRODUCTION_REPORT_URL } from '../constants/webservices'
import ActionUtility from './utilAction'

export const FETCH_PRODUCTION_REPORT = 'FETCH_PRODUCTION_REPORT';

function getProductionReport(form) {

    let url = PRODUCTION_REPORT_URL + "/" + form.startDate + "/" + form.endDate
    console.log("invocando + PRODUCTION_REPORT_URL")
    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, FETCH_PRODUCTION_REPORT, url);
    }
}

export { getProductionReport };