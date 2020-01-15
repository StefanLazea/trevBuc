import React from "react";
import Axios from "axios";
import "./Register.css";
//import {withRoute} from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RegisterErrors } from "./RegisterErrors";
//import "./RegisterErrors.js";

const backUrl = require("../../../src/configuration.json").backend_url;

export default class Register extends React.Component {
    constructor(props) {
        super(props);
       // this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
              email: '',
              password: '',
              confirmPassword: '',
              registerErrors: {email: '', password: '', confirmPassword: ''},
              emailValid: false,
              passwordValid: false,
              confirmPasswordValid: false,
             // formValid: false
        };
    }
    
    handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.registerErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'confirmPassword':
        confirmPasswordValid = passwordValid === fieldValidationErrors.confirmPassword;
        fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': 'does not match the password';
        break;
      default:
        break;
    }
    this.setState({registerErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    confirmPasswordValid: confirmPasswordValid
                  }, this.validateForm);
  }
  
  //   validateForm() {
  //   this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid});
  // }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  
  onSubmit = (e) => {
        e.preventDefault();

        const formValid ={
          email: this.state.emailValid,
          password: this.state.passwordValid
        }

        Axios.post(`${backUrl}/register`, JSON.stringify(formValid),
            {
                headers: { "Content-Type": "application/json" }
            })
            .then((res) => {
                //toast(res.data.message)

                this.nextPath ("/login");
            })
            .catch(error => {

                if (error.response !== undefined) {
                    toast(error.response.data.message)
                } else {
                    toast("hopa")
                }

            });
       
    }
  
    
     render () {
    return (
      <form className="demoForm">
        <h2>Sign up</h2>
        
        <div className="panel panel-default">
          <RegisterErrors registerErrors={this.state.registerErrors} />
        </div>
        
        <div className={`form-group ${this.errorClass(this.state.registerErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        
        <div className={`form-group ${this.errorClass(this.state.registerErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>
        
         <div className={`form-group ${this.errorClass(this.state.registerErrors.confirmPassword)}`}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input type="password" className="form-control" name="confirmPassword"
            placeholder="ConfirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleUserInput}  />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Sign up</button>
      </form>
    )
  }
    
}