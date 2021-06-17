import React, { useState } from 'react';
export default function ProductionForm(props) {

    const [form, setForm] = useState({ startDate: new Date(), endDate: "" })

    const handleSubmit = (event) => {
        event.preventDefault();
        props.action(form)
    }

    const handleChange = (ev) => {
        ev.persist();
        setForm(form => ({ ...form, [ev.target.name]: ev.target.value }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="startDateInput">Start date</label>
                    <input type="date" className="form-control" id="startDate" name="startDate" placeholder="" value={form.startDate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End date</label>
                    <input type="date" className="form-control" id="endDate" name="endDate" placeholder="" value={form.endDate} onChange={handleChange} required />
                </div>
                <div>
                    <button type="button" className="btn btn-primary float-left">Back</button>

                    <button type="submit" className="btn btn-primary float-right" >Search</button>
                </div>
            </form>

        </div>
    )
}