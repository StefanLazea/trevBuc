import React from "react";
import Axios from "axios";
import "./Register.css";
//import {withRoute} from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const backUrl = require("../../../src/configuration.json").backend_url;

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        //this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username:' ',
            password:' ',
            confirmPassword: ' ',
            
            usernameError: ' ',
            passwordError: ' '
        };
    }
    
    change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };
    
    validate = () => {
    let isError = false;
    const errors = {
      usernameError: ' ',
      passwordError: ' '
    };

    if (this.state.username.length < 5) {
      isError = true;
      errors.usernameError = "Valid email required ";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

    // onChangeUserName(e) {
    //     this.setState({ name: e.target.value })
    // }

    // onChangeUserPassword(e) {
    //     this.setState({ email: e.target.value })
    // }
    
//     handleConfirmPassword(event) {
//     if (event.target.value !== this.state.password) {
//       message.error('error')
//       this.setState({confirmPassword: event.target.value})
//     }
// }
    
     onSubmit = (e) => {
        e.preventDefault();
        const userObject = {
            username: this.state.username,
            password: this.state.password
        }

        Axios.post(`${backUrl}/register`, JSON.stringify(userObject),
            {
                headers: { "Content-Type": "application/json" }
            })
            .then((res) => {
                toast(res.data.message)
                
                localStorage.setItem("token", res.data.token);
                this.props.history.push(`/reviews`)
            })
            .catch(error => {
                toast(error.response.data.message)
            });
            
            this.setState({ username: '', password: '' })
    }



    render() {
        return (
           <form class="form-horizontal" action='' method="POST">
  <fieldset>
    <div id="legend">
      <legend class="">Register</legend>
    </div>
    <div class="control-group">
      <label class="control-label" for="email">E-mail</label>
      <div class="controls">
        <input type="text" id="email" name="email" placeholder="" class="input-xlarge" />
        <p class="help-block">Please provide your E-mail</p>
          value={this.state.username}
          onChange={e => this.change(e)}
          errorText={this.state.usernameError}
      </div>
    </div>
 
    <div class="control-group">
      <label class="control-label" for="password">Password</label>
      <div class="controls">
        <input type="password" id="password" name="password" placeholder="" class="input-xlarge" />
        <p class="help-block">Password should be at least 4 characters</p>
          value={this.state.password}
          onChange={e => this.change(e)}
          errorText={this.state.passwordError}
      </div>
    </div>
 
    <div class="control-group">
      <label class="control-label"  for="password_confirm">Password (Confirm)</label>
      <div class="controls">
        <input type="password" id="password_confirm" name="password_confirm" placeholder="" class="input-xlarge" />
        <p class="help-block">Please confirm password</p>
      </div>
    </div>
 
    <div class="control-group">
      <div class="controls">
        <button class="btn btn-success" onClick={e => this.onSubmit(e)}>Register</button>
      </div>
    </div>
  </fieldset>
</form>
        )
    }
    
    
    
    
}