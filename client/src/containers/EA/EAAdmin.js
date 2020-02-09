import React, { Component } from 'react';
import axios from 'axios'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';



class EAAdmin extends Component {


  state = {
    amount: 0,
    type: "Toki",
    size: "Small",
    products: [
      { name: "Juan Daniel Arias", id: 1, notes: "" },
      { name: "Juan", id: 2, notes: "" },
      { name: "Ernesto Ovalle", id: 3, notes: "" },
      { name: "Andres Pulido", id: 4, notes: "" },
    ],
    columns: [{
      dataField: 'name',
      text: 'Name'
    },
    {
      dataField: 'notes',
      text: 'Notes',
      sort: true
    }]
  }

  constructor(props) {
    super(props); 
  }

  rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${row.id}`);
      this.props.history.push('/payslip')
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
        <h4>Employees</h4>

        <form>

          <BootstrapTable
            striped
            hover
            keyField='id'
            data={this.state.products}
            columns={this.state.columns}
            rowEvents={this.rowEvents}
          />


        </form>

      </div>
    );
  }
}

export default EAAdmin;
