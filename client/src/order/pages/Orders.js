import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { getOrders, getOrder, getOrdersByStatus } from '../../redux/actions/orderActions';
import { getStatusList } from '../../redux/actions/statusActions';
import { dateFormatter } from '../../utils/formatters'
import paginationFactory from 'react-bootstrap-table2-paginator';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      type: "Toki",
      size: "Small",
      idStatus: 0,
      orders: [],
      columns: [{
        dataField: 'status.name',
        text: 'Status'
      },
      {
        dataField: 'customer.firstName',
        text: 'Customer',
        sort: true
      },
      {
        dataField: 'createdAt',
        text: 'Creation date',
        sort: true,
        formatter: dateFormatter
      },
      {
        dataField: 'deliveryDate',
        text: 'Delivery date',
        sort: true,
        formatter: dateFormatter
      }]
    };
    this.handleChange = this.handleChange.bind(this);
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/student')
  }


  componentWillMount() {
    this.props.getOrders();
    this.props.getStatusList();
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    })

    if (value === "0")
      this.props.getOrders();
    else
      this.props.getOrdersByStatus(value);
  }


  rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${row.id} - ${rowIndex}`);
      //this.props.getOrder(row.id)
      this.props.history.push('/order/' + row.id)
    },
    onMouseEnter: (e, row, rowIndex) => {
      //console.log(`enter on row with index: ${rowIndex}`);
    }
  };

  render() {
    return (
      <div className="container">

        <br /><br /><br />
        <h4>Orders</h4>

        <form>
          <div className="form-group">
            <label>Status</label>


            <select className="form-control" id="idStatus" name="idStatus"
              onChange={this.handleChange} value={this.state.idStatus}>
              <option value="0">All</option>
              {this.props.statusList && this.props.statusList.map((item, index) => <option key={index}
                value={item.id}>{item.name}</option>)}
            </select>
          </div>
        </form>

        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.props.orders}
          columns={this.state.columns}
          pagination={paginationFactory()}
          rowEvents={this.rowEvents} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.generalReducer.error,
  pending: state.generalReducer.pending,
  orders: state.orderReducer.orders,
  order: state.orderReducer.order,
  items: state.items,
  statusList: state.statusReducer.statusList
});

const mapDispatchToProps = {
  getOrders, getOrder, getStatusList, getOrdersByStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
