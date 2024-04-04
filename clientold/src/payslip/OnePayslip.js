import React, { Component } from 'react';
import axios from 'axios'

import BootstrapTable from 'react-bootstrap-table-next';


import { Link } from 'react-router-dom'
const rowEvents = {
  onClick: (e, row, rowIndex) => {
    console.log(`clicked on row with index: ${row.id} ${row.name}`);
  },
  onMouseEnter: (e, row, rowIndex) => {
    //console.log(`enter on row with index: ${rowIndex}`);
  }
};
 

class OnePayslip extends Component {


  state = {
    amount: 0,
    type: "Toki",
    size: "Small",
    products: [
      { name: "06/05/2019", id: 1, notes: "5", activities: "20 tokis were drilled" },
      { name: "07/05/2019", id: 2, notes: "5.5", activities: "20 tokis were drilled" },
      { name: "08/05/2019", id: 3, notes: "5", activities: "10 Korus were polished" },
      { name: "09/05/2019", id: 4, notes: "5", activities: "1 Hook was repaired" },
    ],
    columns: [
      {
        dataField: 'name',
        text: 'Date'
      },
      {
        dataField: 'id',
        text: 'PaySlip',
        hidden: true
      }, {
        dataField: 'notes',
        text: 'Hours',
        sort: true
      },
      {
        dataField: 'activities',
        text: 'Activities',
        sort: true
      }
    ],
    payslips: [
      { week: "05/05/2019 - 11/05/2019", id: 1},
      { week: "28/04/2019 - 04/05/2019", id: 1},
      { week: "21/04/2019 - 27/04/2019", id: 1},
    ],
    pscolumns: [
      {
        dataField: 'week',
        text: 'Week'
      },        
    ]    

  }

  payslipEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${row.id}`);
      this.props.history.push('/onepayslip')
    },
    onMouseEnter: (e, row, rowIndex) => {
      //console.log(`enter on row with index: ${rowIndex}`);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/student')
  }


  test = () => {
    axios.get("http://localhost:1337/message")
      .then(function (response) {
        console.log(response.data);

      })
      .catch(function (error) {
        console.log("An error has occurred.")

      });
  }



  render() {
    return (
      <div className="container">

        <br /><br /><br />
        <h4>Payslip</h4>
        Ernesto Ovalle
        <form>

          <BootstrapTable
            striped
            hover
            keyField='id'
            data={this.state.products}
            columns={this.state.columns}
            rowEvents={rowEvents}
          />


        </form>
        <button type="submit" className="btn btn-primary float-right">Save</button>

        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.state.payslips}
          columns={this.state.pscolumns} 
          payslipEvents={this.payslipEvents } 
          />

        <Link to="/eaadmin">back</Link>


      </div>
    );
  }
}

export default OnePayslip;
