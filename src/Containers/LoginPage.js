import React, { Component } from 'react';
import "../css/LoginPage.css";
import {Link} from "react-router";
import {connect} from "react-redux";
import {LoginConfirmation} from '../Actions/FormAction';
import {browserHistory} from "react-router";
import {toastr} from 'react-redux-toastr'

class LoginPage extends Component {

  handleClick=e=>{
    e.preventDefault();
    let name = this.textInput.value;
    let password = this.Password.value;
    this.props.loadData(name,password);
  }

  render() {
    var data = this.props.logged;
    if (data.length>=1){
      let type= data[0].type;
      if (type.startsWith("Admin")){
        browserHistory.push("/users");
        toastr.success('Success', 'You have logged in');
      }
      else if(!data[0].enable){
        toastr.warning('Disabled', 'You have been diabled by Admin');
      }
      else{
        browserHistory.push("/dashboard");
        toastr.success('Success', 'You have logged in');
      }
    }
    return (
    <div>
        <form className="form-signin">
            <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
            <label  className="sr-only">Name</label>
            <input type="text" ref={(input) => { this.textInput = input; }} className="form-control" placeholder="Name" required=""/>
            <label  className="sr-only">Password</label>
            <input type="password" ref={(input) => { this.Password = input; }} className="form-control" placeholder="Password" required=""/>
            <button className="btn btn-lg btn-primary btn-block"
             onClick={this.handleClick.bind(this)} type="button">Sign in</button>
            <div className="checkbox mb-3">
                <h4>New User?</h4>
                <Link to={"/register"}>Register Now</Link>
            </div>
        </form>

    </div>    
    );
  }
}


const mapStateToProps = (state) =>
{ 
  return{
    logged: state.LoggedInReducer
  };
};

const mapDispatchToProps = (dispatch) =>
{ 
  return{
    loadData:(name,password)=>
    {
      dispatch(LoginConfirmation(name,password));
      
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (LoginPage);

