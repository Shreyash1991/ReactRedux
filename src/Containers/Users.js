import React, { Component } from 'react';
import {Link} from "react-router"
import {connect} from "react-redux";
import {LoadUsers,EnableUser,DisableUser,ResetForm,ResetLogged,ResetRegister} from "../Actions/RegisterAction"
import UserList from '../Components/UserList';
import "../css/Users.css"
import {browserHistory} from "react-router";
import {toastr} from 'react-redux-toastr'

class Users extends Component {
    
    componentWillMount(){
        this.props.loadUsers();
    }
    handleEnableClick=(data)=>{
        this.props.enable(data)
    }
    handleDisableClick=(data)=>{
        this.props.disable(data)
    }

    handleLogout=()=>{
        browserHistory.push("/");
        this.props.resetForm();
        this.props.resetRegister();
        this.props.resetLogged();
        toastr.success('Success', 'You have logged out');
    }
  
    render() {
        let users = this.props.users;
        let user = users.map((users,i) => {
          return <UserList users={users} 
            Enable={()=>this.handleEnableClick(users)}
            Disable={()=>this.handleDisableClick(users)}/>
        })
    return (
      <div>
         <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/dashboard">Contact Application Manager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/dashboard"}>Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/users"}>Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.handleLogout.bind(this)} 
                            to={"/"}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
        {(this.props.users===undefined)?"No users yet!":<div className="marginTop">{user}</div>}
     </div>    
    );
  }
}

const mapStateToProps = (state) =>
{ 
  return{
    load: state.FormReducer,
    users: state.RegisterReducer
  };
};

const mapDispatchToProps = (dispatch) =>
{ 
  return{
      resetRegister:()=>
      {
        dispatch(ResetRegister());
      },
      resetForm:()=>
      {
        dispatch(ResetForm());
      },
      resetLogged:()=>
      {
        dispatch(ResetLogged());
      },
      loadUsers :()=>
      {
        dispatch(LoadUsers());
      },
      enable :(data) =>
      {
          dispatch (EnableUser(data));
      },
      disable :(data) =>
      {
          dispatch (DisableUser(data));
      },
    
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (Users);

