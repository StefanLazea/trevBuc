import React from "react";
import Axios from "axios";
export default class Login extends  React.Component{
  constructor(props){
    super(props)
    this.state={
  }

}

UsernameRef=React.createRef();
PasswordRef=React.createRef();
DateRef=React.createRef();
render() {

  return (
     <form class="center">
    <div class="form-group" >
      <label for="exampleInputUsername1">Username</label>
      <input type="Username" class="form-control" id="exampleInputUsername1" aria-describedby="UsernameHelp" placeholder="Enter Username"/>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    <button type="submit" class="btn btn-primary resizebtn" >Login</button>
    <button type="submit" class="btn btn-primary resizebtn" id="LoginGmail">Login with gmail</button>
    <br/>
    <br/>
    <button type="button" class="btn btn-light ">Reset Password</button>
  </form>
  )
}
}