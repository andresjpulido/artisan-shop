import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMovementsByPeriod, weeklyReport } from '../../redux/actions/movementsActions'
import { dateFormatter } from '../../utils/formatters'

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function writeWeek(curr){
  //let curr = new Date (2020, 0, 18)
    let week = []
    
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
    }
//console.log(curr + " >> " + week[0] + " - " + week[6])
return week
}

function daysIntoYear(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}
 
 
class Movements extends Component {

  state = {
    movements: [],
    weeklyMovements: [],
    columns: [      
    {
        dataField: 'namepiece',
        text: 'Product',
        sortable: true,
    },
    {
        dataField: 'sizepiece',
        text: 'Size',
        sortable: true
    },    
    {
        dataField: 'totalpieces',
        text: 'Total'
    }],
    columns2: [   
      {
          dataField: 'createdAt',
          text: 'Date',
          sortable: true,
          formatter: dateFormatter
      },   
      {
          dataField: 'productType.name',
          text: 'Product',
          sortable: true,
      },
      {
          dataField: 'size.name',
          text: 'Size',
          sortable: true
      },    
      {
          dataField: 'amount',
          text: 'Amount'
      }],
      weeks:[],
      week:""
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
 
  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    })
     
    var t = value.split(" - ");
    this.props.weeklyReport(t[0], t[1])    
    this.props.getMovementsByPeriod(t[0], t[1]);
    
  }

  componentWillMount() {   
   
    let curr = new Date (2020, 0, 1)
    let week = []
    var i = 0 
    do {
      console.log(i)
      week = writeWeek(curr);
      //console.log( week[0] + " - " + week[6])
      curr = addDays(curr, 6)
      i++;
    //console.log(daysIntoYear(new Date(week[6])) +"<"+ daysIntoYear(new Date()))
    this.state.weeks.push(week[0] + " - " + week[6])
    }
    while (daysIntoYear(new Date(week[6])) < daysIntoYear(new Date())); 

    var t = this.state.weeks[this.state.weeks.length-1].split(" - ");
    this.props.weeklyReport(t[0], t[1])
    this.props.getMovementsByPeriod(t[0], t[1]);

  }

  render() {
  console.log(this.props.weeklyMovements, this.props.movements)
    return (
      <div className="container">

        <br /><br /><br />
        <h4>Movements</h4>

        <form>
          <div className="form-group">
            <label htmlFor="nameInput">Week:</label>
            <select className="form-control" id="week" name="week"  
              onChange={this.handleChange} value={this.state.week}>                
                  {this.state.weeks.map((item) => <option key={item.id} 
                  value={item.id}>{item}</option>)}
            </select> 
          </div>
        </form>

        <h5>Details</h5>

        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.props.weeklyMovements}
          columns={this.state.columns} 
         
        />
  
        <h5>History</h5>

        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.props.movements}
          columns={this.state.columns2} 
         
        />       

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.generalReducer.error,
    pending: state.generalReducer.pending,
    movements: state.movementsReducer.movements,
    weeklyMovements: state.movementsReducer.weeklyMovements,
     
  }
}
 
const mapDispatchToProps = dispatch => bindActionCreators({
    getMovementsByPeriod: getMovementsByPeriod,
    weeklyReport: weeklyReport
}, dispatch)  

export default (connect(mapStateToProps, mapDispatchToProps))(Movements);
