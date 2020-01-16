import React from "react";
import Axios from "axios";
import "./ResetPassword.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const backUrl = require("../../../src/configuration.json").backend_url;


export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ' ',
      newPassword: ' ',
      password: ' ',
      isOk: true
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

  }

  validateFields = () => {
      if(this.state.newPassword.length < 6)
      {
        toast("Update failed! Password must have at least 6 characters");
        this.setState({isOk: false});
      }
      else if(this.state.newPassword !== this.state.password)
      {
        toast("Update failed! New Password must match Confirm Password");
        this.setState({isOk: false});
      }
      else
      {
        this.setState({isOk: true});
      }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    await this.validateFields();
    if(this.state.isOk === true){
        const password = {
            username: this.state.username,
            password: this.state.password,
          }
        Axios.put(`${backUrl}/resetpassword`, JSON.stringify(password), 
        {
          headers: { "Content-Type": "application/json" }
        }
        ).then((res) => 
        {
        toast(res.data.message)
        this.props.history.push(`/login`)
        })
        .catch(error => {
          if (error.response !== undefined) {
            toast(error.response.data.message)
          } else {
            toast("An error occured. Please try again later!")
          }
        }
        );
      }
      
    }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4" id="form">

            <label>Email</label>
            <div className="form-group">
              <input type="text" name="username" className="form-control" onChange={e => this.onChange(e)} placeholder="Enter Email" />
            </div>
            <label>New Password</label>
            <div className="form-group pass_show">
              <input type="password" name="newPassword" className="form-control" onChange={e => this.onChange(e)} placeholder="New Password" />
            </div>
            <label>Confirm Password</label>
            <div className="form-group">
              <input type="password" name="password" className="form-control" onChange={e => this.onChange(e)} placeholder="Confirm Password" />
            </div>
            <button type="submit" className="btn btn-primary resizebtn" onClick={(e) => this.onSubmit(e)}>Reset Password</button>
          </div>
        </div>
      </div>
    )
  }
}