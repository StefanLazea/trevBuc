import React from "react";
import Axios from "axios";
export default class ResetPassword extends  React.Component{
  constructor(props){
    super(props)
    this.state={
  }

}


render() {

  return (
    <div class="container">
	<div class="row">
		<div class="col-sm-4">
		    
		    <label>Current Password</label>
		    <div class="form-group pass_show"> 
                <input type="password" class="form-control" placeholder="Current Password"/> 
            </div> 
		       <label>New Password</label>
            <div class="form-group pass_show"> 
                <input type="password"  class="form-control" placeholder="New Password"/> 
            </div> 
		       <label>Confirm Password</label>
            <div class="form-group pass_show"> 
                <input type="password" class="form-control" placeholder="Confirm Password"/> 
            </div> 
            <button type="submit" class="btn btn-primary resizebtn" id="LoginGmail">Reset</button>
		</div>  
	</div>
</div>
  )
}
}