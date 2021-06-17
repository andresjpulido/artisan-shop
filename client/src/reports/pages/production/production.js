import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getProductionReport } from '../../../redux/actions/reportActions'

import ProductionResult from '../../components/productionresult';
import ProductionForm from '../../components/productionform';

function ProductionReport(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        const loadSpots = async () => {

            //await dispatch(getAllEmployees());

        };
        loadSpots();
    }, [dispatch]);

    console.log(props.report)

    const handlesubmit = async (dataForm) => {
        console.log("handlesubmit ")
        await dispatch(getProductionReport(dataForm, dataForm));
    }


    return (
        <div className="container">
            <br /><br /><br />

            <h4>Production Report</h4>

            <ProductionForm action={handlesubmit} />
            <br /><br /><br /><br /><br />
            {
                props.report.period &&
                <ProductionResult data={props.report} />
            }


        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        error: state.generalReducer.error,
        pending: state.generalReducer.pending,
        employees: state.employeeReducer.employees,
        report: state.reportReducer.report
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    //getAllEmployees: getAllEmployees
    getProductionReport: getProductionReport
}, dispatch)

export default (connect(mapStateToProps, mapDispatchToProps))(ProductionReport);
