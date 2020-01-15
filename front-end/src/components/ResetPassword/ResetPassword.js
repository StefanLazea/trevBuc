import React from "react";

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

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
              <input type="password" class="form-control" placeholder="Confirm Password" />
            </div>
            <button type="submit" class="btn btn-primary resizebtn" id="LoginGmail">Reset</button>
          </div>
        </div>
      </div>
    )
  }
}