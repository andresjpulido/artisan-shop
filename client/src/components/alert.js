import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

export default function Alert() {

    const alert = useSelector(state => state.generalReducer.alert)

    if (!alert)
    return (
        <Fragment />
    )
    
    let alertstyle = ""

    if (alert.type === "ERROR")
        alertstyle = "alert alert-danger mt-3"
    if (alert.type === "SUCCESS")
        alertstyle = "alert alert-success mt-3"



    return (
        <div className="container">
            <div className={alertstyle} role="alert">
                {
                    alert.description
                }
            </div>
        </div>
    )

}