import axios from "axios";
import {browserHistory} from "react-router";

const uuidv1 = require('uuid/v1');

export function enableUser(data){
    return{
        type:"ENABLE_USER",
        payload:data
    };
}

export function ResetRegister(){
    return{
        type:"RESET_REGISTER",
        payload:[]
    };
}

export function ResetForm(){
    return{
        type:"RESET_FORM",
        payload:[]
    };
}
export function ResetLogged(){
    return{
        type:"RESET_LOGGED",
        payload:[]
    };
}


export function disableUser(data){
    return{
        type:"DISABLE_USER",
        payload:data
    };
}

export function loadUser(data){
    return{
        type:"LOAD_USER",
        payload:data
    };
}

export function LoadUsers(){
    return (dispatch)=> { 
        return axios.get("http://localhost:8080/Users").then((response) => {
              dispatch (
                loadUser(response.data)
              )          
      })
    }
}


export function DisableUser(data){
    return (dispatch)=> { 
        return axios.put("http://localhost:8080/Users/" + data.id, {
            enable:false,
            name:data.name,
            password:data.password,
            type : data.type
          }).then((response) => {
              dispatch (
                  disableUser(response.data)
              )          
      })
    }
}


export function EnableUser(data){
    return (dispatch)=> { 
        return axios.put("http://localhost:8080/Users/" + data.id, {
            enable:true,
            name:data.name,
            password:data.password,
            type : data.type
          }).then((response) => {
              dispatch (
                  enableUser(response.data)
              )          
      })
    }
}
