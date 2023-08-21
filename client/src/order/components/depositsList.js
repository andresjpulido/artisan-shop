import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readAllDeposit, 
  del,
} from "../../redux/actions/depositActions";
import { ALERT } from "../../redux/constants/ActionTypes";
import { toDate } from "../../utils/formatters";

export default function depositsList(props) {
  const id = props.orderId;
  let price = props.price;
  price = price * -1
  const deposits = useSelector((state) => state.depositReducer.deposits);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ALERT, payload: null });

    if (id) {
      dispatch(readAllDeposit({ id_order: Number(id) }));
    } else {
      //TODO redireccionar a la pagina principal de las ordenes
    }
  }, [id]);

  if (!deposits) return <div></div>;
 

  const depositList = (deposits) => {
    let content = [];
    let balance = 0;

    for (let i = 0; i < deposits.length; i++) {
      const item = deposits[i];
      balance = balance + item.amount;
      content.push(
        <tr key={i}>
          <td>{toDate(item.createdAt)}</td>
          <td>{item.amount}</td>
          <th>
            {price + balance} 
          </th>
          <td>
            <button
              type="button"
              className="btn btn-outline-danger float-right"
              onClick={() => {
                dispatch(del(item.id, id));
              }}
            >
              Del
            </button>
          </td>
        </tr>
      );
    }
    return content;
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Deposits</th>
            <th scope="col">Balance</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td> </td>
            <td>0</td>
            <th>{price} </th>
            <td></td>
          </tr>
          {depositList(deposits)}
        </tbody>
      </table>
    </div>
  );
}
