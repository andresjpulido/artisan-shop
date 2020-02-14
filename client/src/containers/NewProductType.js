import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {create} from '../redux/actions/productTypeActions'

class NewProductType extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
       
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.create(this.props.productType)
    this.props.history.push('/Producttype')
  }
 
  handleChange(e) { 
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    })
    
    this.props.productType[name]= value;
    console.log(this.state, this.props.productType)
  }

  render() {
    return (
      <div className="container">

        <br /><br /><br />
        <h4>New product type</h4>

        <form>           
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" id="name"  name="name" 
              value={this.props.productType.name} onChange={this.handleChange} />
          </div> 
        </form>

        <button type="button" className="btn btn-primary float-left" onClick={this.back}>Back</button>
        
        <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit}>Save</button>

        <br />
 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    error: state.error,
    productType: state.productTypeReducer.productType,
    pending: state.pending
  }
}
 
const mapDispatchToProps = dispatch => bindActionCreators({   
  create: create
}, dispatch)  

export default (connect(mapStateToProps, mapDispatchToProps))(NewProductType);  
