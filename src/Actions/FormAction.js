import axios from "axios";
import {browserHistory} from "react-router";
import {toastr} from 'react-redux-toastr'

const uuidv1 = require('uuid/v1');


export function listOfItems(data){
    return{
        type:"RETRIEVE_DATA",
        payload:data
    };
}
export function add(data){
    return{
        type:"ADD_CONTACT",
        payload:data
    };
}


export function Delete(data){
    return{
        type:"DELETE_CONTACT",
        payload:data
    };
}

export function update(data){
    return{
        type:"UPDATE_CONTACT",
        payload:data
    };
}

export function AddContactAction(name,number,type){
    return (dispatch)=> { 
        return axios.post("http://localhost:8080/Contacts", {
            id :uuidv1(),
            name: name,
            number: number,
            type:type,
            isEditing:false
          }).then((response) => {
              dispatch (
                  add(response.data)
              )          
      })
    }
}

export function Update(data){
    return (dispatch)=> { 
        debugger
        return axios.put("http://localhost:8080/Contacts/" + data.id, {
            isEditing:true,
            name:data.name,
            number:data.number,
            type : data.type
          }).then((response) => {
              dispatch (
                  update(response.data)
              )          
      })
    }
}


export function Save(name,number,type,id){
    return (dispatch)=> { 
        return axios.put("http://localhost:8080/Contacts/" + id, {
            isEditing:false,
            name:name,
            number:number,
            type : type
          }).then((response) => {
              dispatch (
                  update(response.data)
              )          
      })
    }
}




export function DeleteSelected(data,typeOfUser){
    return (dispatch)=> { 
        return axios.delete("http://localhost:8080/Contacts/" + data).then((response) => {
            return axios.get("http://localhost:8080/Contacts").then((response) => {
                var data  = response.data;
                let element=data.filter((data,i) => {
                    return data.type == typeOfUser
                });
                dispatch(
                    listOfItems(element)
                );
          })    
      })
    }
}


export function LoginConfirmation(name,password){
    return (dispatch)=> { 
        debugger
        return axios.get("http://localhost:8080/Users").then((response) => {
            var data  = response.data;
            console.log(response.data)
            let element=data.filter((data,i) => {
                return data.name === name && data.password === password
            });
            if(element.length>=1){
                
                dispatch(
                    {
                    type:"LOAD_USER_DETAIL",
                    payload:element
                    }
                );
              
              
            } 
            else{
                toastr.warning('Login Failed', 'Wrong Name or Password');
            }
      })
    }
}


export function register(name,password){
    return (dispatch)=> { 
        return axios.post("http://localhost:8080/Users", {
            id :uuidv1(),
            name: name,
            password: password,
            type:"User" + uuidv1(),
            enable:true
          }).then((response) => {
              browserHistory.push("/");
              toastr.success('Success', 'You have succesfully registered');
        })
    }
}

export function LoadContacts(input,type){
    return (dispatch)=> { 
        return axios.get("http://localhost:8080/Contacts").then((response) => {
                    var data  = response.data;
                    let element=data.filter((data,i) => {
                        return data.name.includes(input) && data.type == type;
                    });
                    
                    dispatch(
                        listOfItems(element)
                    );
              })
    }
}


        
