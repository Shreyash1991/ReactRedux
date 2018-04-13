import React, { Component } from 'react';
import "../css/Dashboard.css";
import {Link} from "react-router"
import ContactList from "../Components/ContactList";
import Users from "../Containers/Users"
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {AddContactAction,DeleteSelected,Update,Save,LoadContacts} from "../Actions/FormAction"
import {toastr} from 'react-redux-toastr'


class Dashboard extends Component {
    componentWillMount(){
            var type = this.props.logged[0].type;
            var search = "";
            this.props.loadContacts(search,type);
    }

    handleAdd=()=>{
        var name = this.textInput.value;
        var number = this.number.value;
        var type=this.props.logged[0].type;
        var pattern =/^[1-9][0-9]{3,5}$/
        if( name !== "" && number !==""){
            if(pattern.test(number)){
            this.props.addContact(name,number,type)
            }
            else{
                toastr.info('Number should be of length 4 to 6', 'You have to fill the number field correctly');
            }
        }
        else{
            toastr.info('Enter name and number', 'You have to fill both the fields');
        }

    }
    Save =(name,number,type,id)=>{
        this.props.Save(name,number,type,id);

    }

    Update=(data)=>{
        this.props.Update(data);
    }

    handleSearch =()=>{
        var type = this.props.logged[0].type;
        var search = this.search.value;
        this.props.loadContacts(search,type);
    }
    handleLogout=()=>{
        browserHistory.push("/");
        this.props.resetForm();
        this.props.resetRegister();
        this.props.resetLogged();
        toastr.success('Success', 'You have logged out');
    }

    

    Delete=(id,type)=>{
        this.props.delete(id,type);
    }

    render() {
        var data =this.props.load;
        let contact ={};
        if(data){
            contact =data.map((data,i) => {
            return  <ContactList load={data} 
                        Update ={()=>this.Update(data)}
                        Save ={this.Save.bind(this)} 
                        Delete={this.Delete.bind(this)} 
                        />;
          });
        }

        
    return (
      <div>
          
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/dashboard">Contact Application Manager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {(this.props.logged[0].type.startsWith("Admin"))?(<div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/dashboard"}>Contact</Link>
                        </li>
                        <li className="nav-item">
                            <form class="form-inline mt-2 mt-md-0">
                                <input class="form-control mr-sm-2" type="text" 
                                ref={(input) => { this.search = input; }}
                                onChange={this.handleSearch.bind(this)}
                                placeholder="Search" aria-label="Search"/>
                            </form>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/users"}>Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.handleLogout.bind(this)} to={"/"}>Logout</Link>
                        </li>
                    </ul>
                </div>):(
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/dashboard"}>Contact</Link>
                        </li>
                        <li className="nav-item">
                            <form class="form-inline mt-2 mt-md-0">
                                <input class="form-control mr-sm-2" type="text" 
                                ref={(input) => { this.search = input; }}
                                onChange={this.handleSearch.bind(this)} placeholder="Search" aria-label="Search" />
                            </form>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.handleLogout.bind(this)} to={"/"}>Logout</Link>
                        </li>
                    </ul>
                </div>)}
            </div>
        </nav>
        <div className="data">
            <div className="heading">Contact List</div>
            <div className="row add">
                <div className="col-md-2 name">
                    Name:
                </div>
                <div className="col-md-3 ">
                    <input type="text" ref={(input) => { this.textInput = input; }}  placeholder="Name" required=""/> 
                </div>
                <div className="col-md-2 name">
                    Number:
                </div>
                <div className="col-md-3 ">
                    <input type="text" ref={(input) => { this.number = input; }}  placeholder="Number" required=""/>
                </div>
                <div className="col-md-2">
                    <button className="btn-primary" onClick = {this.handleAdd.bind(this)}>ADD</button>
                </div>
            </div>    
            <div className="contact">{contact}</div>
        </div>

      </div>    
    );
    
  }
}



const mapStateToProps = (state) =>
{ 
  debugger
  return{
    load: state.FormReducer,
    logged: state.LoggedInReducer
  };
};

const mapDispatchToProps = (dispatch) =>
{ 
  return{
    loadContacts:(data,type)=>
    {
    dispatch(LoadContacts(data,type));
    },
    Save :(name,number,type,id)=>
    {
    dispatch(Save(name,number,type,id));
    },
    Update : (data) =>
    {
      dispatch(Update(data));
    },
    delete : (data,type) =>
    {
        dispatch(DeleteSelected(data,type));
    },
    addContact:(name,number,type) =>
    {
        dispatch(AddContactAction(name,number,type));
    }
    
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (Dashboard);
