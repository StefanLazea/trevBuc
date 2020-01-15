import React from "react";
import Axios from "axios";

const backUrl = require("../../../src/configuration.json").backend_url;


export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username:" ",
    password:" "
    }

  }

 handleChange= event=>{
   this.setState({name:event.target.value});
 }
 
 
 handleSubmit=e=>{
   e.preventDefault();
   const password={
     username:this.state.username,
     password:this.state.password
   }
    Axios.put(`${backUrl}/resetpassword`,JSON.stringify(password),{
      headers: { "Content-Type": "application/json" }
    }
 ).then(r => console.log(r.status))
    .catch(e => console.log(e));
 }
 
 

 
  
  
  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">

            <label>Current Password</label>
            <div className="form-group pass_show">
              <input type="password" className="form-control" placeholder="Current Password" />
            </div>
            <label>New Password</label>
            <div className="form-group pass_show">
              <input type="password" className="form-control" placeholder="New Password" />
            </div>
            <label>Confirm Password</label>
            <div class="form-group pass_show">
              <input type="password" className="form-control" placeholder="Confirm Password" onChange={this.handleChange}/>
            </div>
            <button type="submit" class="btn btn-primary resizebtn" id="LoginGmail">Reset</button>
          </div>
        </div>
      </div>
    )
  }
}