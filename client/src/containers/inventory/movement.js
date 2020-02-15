import React, { Component } from 'react';
 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newMovement } from '../../redux/actions/inventoryActions'
import { getAllOperations } from '../../redux/actions/operationActions'
import { getProductTypes } from '../../redux/actions/productTypeActions'
import { getSizes } from '../../redux/actions/sizeActions' 
import { Link } from "react-router-dom";

class Movement extends Component {
 
    constructor(props) {
      super(props);
      this.state = {
        submitted: false,
        movement:{
          id_operation:1,
          id_productType:1,
          id_size:1
        }
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); 
    }

     
    cleanError = () => {
      this.props.error["message"]=""
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const user = this.props.user;
      this.props.movement["username"] =  user.username;  

      if(this.props.movement["id_operation"] === undefined){
      const operations = this.props.operations;
      console.log(operations)
      this.props.movement["id_operation"] =  operations[0].id; 
      }
    
      if(this.props.movement["id_productType"] === undefined){
      const productTypes = this.props.productTypes;
      console.log(productTypes)
      this.props.movement["id_productType"] =  productTypes[0].id; 
      }

      if(this.props.movement["id_size"] === undefined){
      const sizes = this.props.sizes;
      console.log(sizes)
      this.props.movement["id_size"] =  sizes[0].id; 
      }

      console.log(" >> save >> " , this.props.movement )
      this.props.newMovement(this.props.movement);
      this.props.history.push('/movement')

      this.setState({"submitted":true})
    }
     
    handleChange(e) { 
        const target = e.target;
        const name = target.name;
        const value = target.value;
    
        this.setState({
          [name]: value,
        })
        
        this.props.movement[name]= value;
        console.log(" >>>> " , this.props.movement) 
      }

    componentWillMount() {           
      this.props.getAllOperations();
      this.props.getProductTypes();
      this.props.getSizes();
      this.doWork()
    }
  
     
    doWork () {
      console.log("doWork")
        this.setState({message: "Loading..."});
        this.doWorkAsync();
    } 
    doWorkAsync () {
        var self = this;
        setTimeout(function() {

            for (var i = 0; i < 1000000000; i++) {
                ;
            }

            self.setState({message: "Done."});
        }, 0); // timeout of 0 ms means "run at the end of the current event loop"
    }


    render() {
      
      if(this.state.submitted){
        
        if(this.props.error && this.props.error.message){
          const operations = this.props.operations; 
          this.props.movement["id_operation"] =  operations[0].id; 
         
          const productTypes = this.props.productTypes; 
          this.props.movement["id_productType"] =  productTypes[0].id; 
        
          const sizes = this.props.sizes; 
          this.props.movement["id_size"] =  sizes[0].id; 

          return (
            <div className="container">   
              <br /><br /><br />
              <h4>Movement</h4> 
              <p>Sorry, the operation was fail! </p>
              <Link to={`/inventory`} className="btn btn-primary float-right" onClick={this.cleanError}>Back</Link>
            </div>
          )  

        } else{
        
          return (
            <div className="container">   
              <br /><br /><br />
              <h4>Movement</h4> 
              <p>The operation was succesful!</p>
              <Link to={`/inventory`} className="btn btn-primary float-right">Back</Link>
            </div>
          )  
        }        
      }
      else{
 
        return (
  
          <div className="container">
   
            <br /><br /><br />
            <h4>Movement</h4>   
          
              <form>
              <div className="form-group">
                  <label for="operation">Operation</label>
                  <select className="form-control" id="id_operation" name="id_operation"
                onChange={this.handleChange} value={this.state.id_operation}>                
                  {this.props.operations.map((item) => <option key={item.id} 
                  value={item.id}>{item.name}</option>)}
                  </select> 
              </div>
              <div className="form-group">
                  <label for="nameInput">ProductType</label>
                  <select className="form-control" id="id_productType" name="id_productType" 
                  onChange={this.handleChange} value={this.state.id_productType} >
                  {this.props.productTypes.map((item) => <option key={item.value} 
                  value={item.id}>{item.name}</option>)}
                  </select>
              </div>
              <div className="form-group">
                  <label for="exampleFormControlInput1">Amount</label>
                  <input type="text" className="form-control" id="amount" name="amount" placeholder="Amount" 
                  value={this.props.movement.amount} onChange={this.handleChange}  />
              </div>
              <div className="form-group">
                  <label for="exampleFormControlSelect1">Size</label>
                  <select className="form-control" id="id_size" name="id_size" 
                  onChange={this.handleChange} value={this.state.id_size} >
                  {this.props.sizes.map((item) => <option key={item.value} 
                  value={item.id}>{item.name}</option>)}
                  </select>
              </div>
              <div className="form-group">
                  <label for="record">Description</label>
                  <input type="text" className="form-control" id="description" name="description" placeholder="Description" 
                  value="" />
              </div>                                               
              </form>
   
              <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit}>Save</button>
         
          </div> 
        );

      }
      
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      error: state.generalReducer.error,
      pending: state.generalReducer.pending,
      inventory: state.inventoryReducer.inventory,
      movements: state.inventoryReducer.movements,
      movement: state.inventoryReducer.movement,
      operations: state.operationReducer.operations,
      operation: state.operationReducer.operation,
      productTypes: state.productTypeReducer.productTypes,
      sizes: state.sizeReducer.sizes,
      user: state.authReducer.user 
    }
  }
   
  const mapDispatchToProps = dispatch => bindActionCreators({ 
    getAllOperations: getAllOperations,
    getProductTypes: getProductTypes,
    getSizes: getSizes,
    newMovement: newMovement
  }, dispatch)  
  
  export default (connect(mapStateToProps, mapDispatchToProps))(Movement);
 
  