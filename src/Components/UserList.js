import React, { Component } from 'react';

class UserList extends Component {
    
    handleEnableClick=e=>{
      this.props.Enable(e);
    }
    handleDisableClick=e=>{
      this.props.Disable(e);
    }
  
  render() {
    return (
      <div className="row">
          <div className="col-md-4 name">
          Name :
          </div>
          <div className="col-md-4 value">
          {this.props.users.name} 
          </div>
          <div className="col-md-4">
          {(!this.props.users.enable)?(
          <button className="btn-primary" onClick={this.handleEnableClick.bind(this)}>Enable</button>
          ):(
          <button className="btn-danger" onClick={this.handleDisableClick.bind(this)}>Disable</button>
          )}
          </div>
      </div>    
    );
  }
}

export default UserList;

