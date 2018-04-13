import React, { Component } from 'react';
import "../css/ContactList.css";
import {toastr} from 'react-redux-toastr'



class ContactList extends Component {
  
  componentWillMount(){
    let check=[];
    localStorage.setItem("CheckBox",JSON.stringify(check));
  }
  handleClick=e=>
  {
    var id  = this.props.load.id;
    var type = this.props.load.type;
    const toastrConfirmOptions = {
      onOk: () => this.props.Delete(id,type)
    };
    if (JSON.parse(localStorage.getItem("CheckBox")).length>1){
        var checked = JSON.parse(localStorage.getItem("CheckBox"));
        var contain = checked.filter((checked,i) => {
          return  checked.id===id;
        });
        if(contain.length>=1){
          const toastrMultipleConfirmOptions = {
            onOk: () => {
              var element=checked.map((checked,i) => {
              return  this.props.Delete(checked.id,type)
            });
          }
          };
          toastr.confirm('Delete Multiple Records!', toastrMultipleConfirmOptions);
        }
        else{
          toastr.confirm('Delete!', toastrConfirmOptions);
        }
    }
    else {
      toastr.confirm('Delete!', toastrConfirmOptions);
    }
    
  }

  Save =e =>{
    let name = this.inputName.value;  
    let number = this.inputNumber.value;  
    let type =this.props.load.type;
    let id = this.props.load.id;
    this.props.Save(name,number,type,id);
  }

  handleUpdateClick=e=>{
    this.props.Update(e)
  }

  handleOnChange=()=>{
    let checkbox = this.checkbox.checked;
    var data = this.props.load
    if(checkbox){
      if (JSON.parse(localStorage.getItem("CheckBox"))=== null){
        var check =[];
        check.push(data);
        localStorage.setItem("CheckBox",JSON.stringify(check));
      }
      else{
        var check = JSON.parse(localStorage.getItem("CheckBox"));
          check.push(data);
          localStorage.setItem("CheckBox",JSON.stringify(check));
        }
      }
    else{
        var check = JSON.parse(localStorage.getItem("CheckBox"));
        var element=check.filter((check,i) => {
          return check.name !== data.name;
        });
        localStorage.setItem("CheckBox",JSON.stringify(element));
    }
    
  }

  render() {
    return (
      <div>
        {(!this.props.load.isEditing)?  (  
          <div className="row center">
            <div className="col-md-2 name">
              <input type="checkbox" ref ={(input) => { this.checkbox = input; }}
               onChange ={this.handleOnChange.bind(this)} />
                Name :
            </div>
            <div className="col-md-3 value">
              {this.props.load.name} 
            </div>
            <div className="col-md-2 name"> 
              Contact-Number
            </div>
            <div className="col-md-3 value">
              {this.props.load.number}
            </div>
            <div className="col-md-2">
              <button className="btn-primary" onClick={this.handleUpdateClick.bind(this)}>Edit</button>
              <button className="btn-danger" onClick={this.handleClick.bind(this)}>Delete</button>
            </div>
          </div>
        ):
        (
          <div className="row center">
            <div className="col-md-2 name">
              Name :
            </div>
            <div className="col-md-3">
              <input type="text" ref ={(input) => { this.inputName = input; }}
               defaultValue ={this.props.load.name}/>
            </div>
            <div className="col-md-2 name">   
            Contact-Number
            </div>
            <div className="col-md-3">
              <input type="text" ref ={(input) => { this.inputNumber = input; }}  
               defaultValue ={this.props.load.number}/>
            </div>
            <div className="col-md-2">    
              <button className="btn-primary" onClick={this.Save.bind(this)}>Save</button>
            </div>
          </div>
        )}

      </div>    
    );
  }
}

export default ContactList;
