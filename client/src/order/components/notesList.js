import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAll, del } from "../../redux/actions/noteActions";
import { ALERT } from "../../redux/constants/ActionTypes";
import { toDate } from "../../utils/formatters";

export default function notesList(props) {
  const id = props.orderId;
  const notes = useSelector((state) => state.noteReducer.notes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ALERT, payload: null });
    
    if (id) { 
      dispatch(readAll({ id_order: Number(id) }));
    } else {
      //TODO redireccionar a la pagina principal de las ordenes
    }
  }, [id]);

  return (
    <div className="list-group">
      {notes &&
        notes.map((note, index) => {
          return (
            <div key={index} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1">{toDate(note.createdAt)}</h6>
                <button
                  type="button"
                  className="btn btn-outline-danger float-right"
                  onClick={() => {
                    dispatch(del(note.id, id));
                  }}
                >
                  Del
                </button>
              </div>
              <p className="mb-1">{note.content}.</p>
            </div>
          );
        })}
    </div>
  );
}
