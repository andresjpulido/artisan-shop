import React from 'react';

export default function OrdersReport() {

    return (
        <div className="container">
            <br /><br /><br />
            <br /><br /><br />
            <h4>Orders Report</h4>
            <form>
                <div className="form-group">
                    <label htmlFor="startDateInput">Start date</label>
                    <input type="date" className="form-control" id="startDate" name="startDate" placeholder=""
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End date</label>
                    <input type="date" className="form-control" id="startDateInput" name="startDateInput" placeholder=""
                        />
                </div>
            </form>
            <div>
                <button type="button" className="btn btn-primary float-left">Back</button>

                <button type="submit" className="btn btn-primary float-right" >Save</button>
            </div>

            <br /><br /><br /><br /><br />
            <div>

                <div>
                    <h4>Orders Report</h4>
                    <br />
                    <h5 className="text-sm-right">26 April - 02 May</h5>

                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Toki LS</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <th scope="row">Total</th>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <br />
                <div>
                    <h5 className="text-sm-right">03 May - 09 May</h5>

                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Toki LS</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <th scope="row">Total</th>
                                <td>4</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <br />
                <h5 className="text-sm-right">Summary</h5>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th className="bg-dark text-white" scope="row">Period</th>
                            <td>26 April - 09 May</td>
                        </tr>
                        <tr>
                            <th className="bg-dark text-white" scope="row">Total</th>
                            <td >6</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div >
    )
}