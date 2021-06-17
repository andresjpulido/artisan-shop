import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addHour, getHour, UPD_HOUR } from '../redux/actions/hourActions';
import { ALERT } from '../redux/constants/ActionTypes';
import { getdate } from '../utils/formatters';
import { useHistory } from "react-router-dom";

export default function Hour(props) {

  const hour = useSelector(state => state.hourReducer.hour)
  const user = useSelector(state => state.authReducer.user)

  const dispatch = useDispatch();
  const { id } = useParams();
  let history = useHistory()

  useEffect(() => {
    if (id)
      dispatch(getHour(id))
    else {
      let idemp = (user.employee ? user.employee.id : 1)
      dispatch({
        type: UPD_HOUR, payload: {
          start_date: getdate(), amount: "1",
          activity: "", id_emp: idemp
        }
      })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(hour)
    await dispatch(addHour(hour));
  }

  const handleChange = (ev) => {
    ev.persist();
    dispatch({ type: UPD_HOUR, payload: { ...hour, [ev.target.name]: ev.target.value } })
  }

  const goback = () => {
    dispatch({ type: ALERT, payload: null })
    history.push("/ea")
  }

  return (
    <div className="container">

      <br /><br /><br />
      <h4>New Hour</h4>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="start_date">Date</label>
          <input type="date" className="form-control" name="start_date" id="start_date" defaultValue={hour.start_date}
            onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <select className="form-control" id="amount" name="amount"
            value={hour.amount} onChange={handleChange} required>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map(
                (item, index) => <option value={item} key={index}>{item}</option>
              )
            }
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="activity">Activities</label>
          <textarea className="form-control" id="activity" name="activity" value={hour.activity} onChange={handleChange} />
        </div>

        <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
          <button type="button" className="btn btn-primary float-left" onClick={goback}>Back</button>
          <button type="submit" className="btn btn-primary float-right">Save</button>
        </div>
      </form>

    </div>
  );
}
