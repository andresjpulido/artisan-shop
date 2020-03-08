import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getHours} from '../redux/actions/hourActions'
import { dateFormatter } from '../utils/formatters'




class ExtraHours extends Component {

  constructor(props){
    super(props);
     
    this.state = {
      unpaidHours: [],
      columns: [{
        dataField: 'end_date',
        text: 'Date',
        formatter: dateFormatter
      },
      {
        dataField: 'amount',
        text: 'Hours',
        sort: true
      },
      {
        dataField: 'activity',
        text: 'Activity' 
      }]
    }

    

    
  }
 
  componentWillMount() {   
   
    const u = this.props.user;  
    this.props.getHours(u.username);
    console.log(this.state.unpaidHours, u.username)
  //  /store.subscribe(render);
  }  

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/newea')
  }

  getSelectedRowKeys() { 
    console.log(this.refs.table)
     console.log(this.refs.table.selectionContext.selected)
   }

  onRowSelect(row, isSelected){
    var rowStr = "";
    for(var prop in row){
      rowStr+=prop+": '"+row[prop]+"' ";
    }
    //alert("is selected: " + isSelected + ", " + rowStr);
   
  }

  render() {
 
    console.log("invocando el render")

    const selectRow = {
      mode: 'checkbox' ,
      onSelect: this.onRowSelect,
    };

    console.log(selectRow.selected)

    return (
      <div className="container">

        <br /><br /><br />
        <h4>Worked Hours</h4>
  
        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.props.unpaidHours}
          columns={this.state.columns} 
          selectRow={ selectRow } 
          ref='table'/>

        <button id="move" className="btn btn-secondary" type="button" onClick={this.handleSubmit}>New</button>
        <button id="delete" className="btn btn-secondary" type="button" onClick={this.getSelectedRowKeys.bind(this)}>Delete</button>
         


      </div>
    );
  }
}


//TODO add number of hours existing

const mapStateToProps = (state) => {
  return {
    error: state.generalReducer.error,
    pending: state.generalReducer.pending,
    user: state.authReducer.user,     
    unpaidHours: state.hourReducer.unpaidHours 
  }
}
 
const mapDispatchToProps = dispatch => bindActionCreators({
  //fetchEmployees: fetchEmployeesAction,
  getHours: getHours
}, dispatch)  

export default (connect(mapStateToProps, mapDispatchToProps))(ExtraHours); 
