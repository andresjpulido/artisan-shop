import React, { useEffect } from "react";
import { getOrders, getOpenedOrders } from "../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { ALERT } from "../redux/constants/ActionTypes";

export default function Home(props) {
  let orders = useSelector((state) => state.orderReducer.orders);
  const auth = useSelector((state) => state.authReducer.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ALERT, payload: null });
    dispatch(getOrders());
  }, []);

  let welcome = "";

  if (auth === null || auth === undefined || auth.lastlogin === undefined) {
    welcome = <div></div>;
  } else {
    const lastlogin = new Date(auth.lastlogin);
    let last = new Intl.DateTimeFormat("en-NZ", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hourCycle: "h24",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(lastlogin);

    welcome = (
      <div>
        <h1>Welcome {auth.username}!</h1>
        <p className="lead">Your last date login was {last}.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <br />
      <br />
      <br />

      <div className="jumbotron">
        {welcome}

        <h1>Notifications</h1>
        {orders && orders.length > 0 && (
          <p className="lead">
            There are<span className="badge">{orders.length}</span>
            pending orders.
          </p>
        )}

        <p className="lead">Lastest Orders</p>

        <p className="lead">Priority Orders</p>

        <p className="lead">Oldest Orders</p>
      </div>
    </div>
  );
}
