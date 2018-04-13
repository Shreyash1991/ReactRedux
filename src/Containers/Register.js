import React, { Component } from 'react';
import {connect} from "react-redux";
import {register} from '../Actions/FormAction';
import {browserHistory} from "react-router";
import {toastr} from 'react-redux-toastr'

class Register extends Component {
  handleSubmitClick=e=>{
    debugger
    e.preventDefault();
    var name =this.name.value;
    var password =this.password.value;
    if(name===undefined||name ===""||password===""||password===undefined||password===""){
      toastr.warning('Please enter the details', 'No fields should be left empty');
    }
    else if(password.length<=9){
      toastr.warning('Enter correct Password', 'Password length should be more than 9');
    }
    else{
      this.props.register(name,password);
    }
  }

  render() {
    
    return (
      <div>
          <form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <label  className="sr-only">Name</label>
            <input type="input" ref={(input) => { this.name = input; }}
             className="form-control" placeholder="Name" required=""/>
            <label  className="sr-only">Password</label>
            <input type="text" ref={(input) => { this.password = input; }}
             className="form-control" placeholder="Password" required=""/>
            <button className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmitClick.bind(this)} type="button">Register</button>
          </form>

      </div>    
    );
  }
}

const mapStateToProps = (state) =>
{ 
  return{
    load: state.FormReducer
  };
};

const mapDispatchToProps = (dispatch) =>
{ 
  return{
    register:(name,password)=>
    {
      dispatch(register(name,password));
      
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (Register);


