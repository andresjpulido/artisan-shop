import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Alert() {
  const alert = useSelector((state) => state.generalReducer.alert);

  if (!alert) return <Fragment />;

  let alertstyle = "";
  let description = "";

  if (alert.type === "ERROR") alertstyle = "alert alert-danger mt-3";
  if (alert.type === "SUCCESS") alertstyle = "alert alert-success mt-3";
 
  if (typeof alert.description === "string") description = alert.description;
  else description = "Error";

  return (
    <div className="container">
      <div className={alertstyle} role="alert">
        {description}
      </div>
    </div>
  );
}
