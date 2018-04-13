import React, { Component } from 'react';
import {Router,Route,browserHistory} from "react-router";
import LoginPage from "./Containers/LoginPage";
import Register from "./Containers/Register"
import Dashboard from "./Containers/Dashboard"
import Users from './Containers/Users';
import ReduxToastr from 'react-redux-toastr';


class App extends Component {
  render() {
    return (
      <div>
        <ReduxToastr
            timeOut={2000}
            newestOnTop={false}
            preventDuplicates
            position="top-center"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar/>
      <Router history ={browserHistory}>
       <Route path={"/"} component = {LoginPage}>
       </Route>
       <Route path={"/dashboard"} component = {Dashboard}>
       </Route> 
       <Route path={"/users"} component = {Users}>
       </Route>
       <Route path={"/register"} component = {Register}>
       </Route>
      </Router>
      </div>
    );
  }
}

export default App;
