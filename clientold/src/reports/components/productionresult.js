import React from 'react';

export default function ProductionResult(props) {

    if (!props.data) return (<div></div>)

    const report = props.data

    return (
        <div>
            {
                report.weeks && report.weeks.map((week, index) => (
                    <div key={index}>
                        <h5 className="text-sm-right">{week.period}</h5>

                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    week.items.map((item, itemindex) => (
                                        <tr key={itemindex}>
                                            <td>{item.product}</td>
                                            <td>{item.amount}</td>
                                        </tr>
                                    )
                                    )
                                }
                                <tr>
                                    <th scope="row">Total</th>
                                    <td>{week.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            }

            < br />
            <h5 className="text-sm-right">Summary</h5>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th className="bg-dark text-white" scope="row">Period</th>
                        <td>{report.period}</td>
                    </tr>
                    <tr>
                        <th className="bg-dark text-white" scope="row">Total</th>
                        <td >{report.total} pcs.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}