import React from "react";
import Axios from "axios";
import "./Register.css";
//import {withRoute} from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import "./RegisterErrors.js";

const backUrl = require("../../../src/configuration.json").backend_url;

export default class Register extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.onSubmit = this.onSubmit.bind(this);

  //   // this.state = {
  //   //   email: '',
  //   //   password: '',
  //   //   confirmPassword: '',
  //   //   registerErrors: { email: '', password: '', confirmPassword: '' },
  //   //   emailValid: false,
  //   //   passwordValid: false,
  //   //   confirmPasswordValid: false,
  //   //   // formValid: false
  //   // };
  // }
  constructor(props) {
    super(props);
    this.state = {
      password: ' ',
      email: ' ',
      confirmPassword: '',
      emailError: true
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //{`form-group ${this.errorClass(this.state.registerErrors.email)}`}
  validateField(fieldName, value) {
    let fieldValidationErrors;
    let passwordValid;
    let confirmPasswordValid;
    switch (fieldName) {
      case 'email':
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
          this.setState({ emailError: false })
        } else {
          this.setState({ emailError: true })
          toast("Email incorect");
        }
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'confirmPassword':
        confirmPasswordValid = passwordValid === fieldValidationErrors.confirmPassword;
        fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : 'does not match the password';
        break;
      default:
        break;
    }
  }

  errorClass(error) {
    return (error === false ? '' : 'has-error');
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.validateField("email", this.state.email);
    const form = {
      password: this.state.password,
      username: this.state.email
    }

    console.log(this.state.emailError)

    // console.log(JSON.stringify(form))

    // Axios.post(`${backUrl}/register`, JSON.stringify(form),
    //   {
    //     headers: { "Content-Type": "application/json" }
    //   })
    //   .then((res) => {
    //     toast(res.data.message)
    //     this.nextPath("/login");
    //   })
    //   .catch(error => {
    //     if (error.response !== undefined) {
    //       toast(error.response.data.message)
    //     } else {
    //       toast("Something went wrong")
    //     }
    //   });

  }

  render() {
    return (
      <form className="demoForm">
        <h2>Sign up</h2>

        <div className={`form-group ${this.errorClass(this.state.emailError)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control"
            name="email"
            placeholder="Email"
            onChange={e => this.handleChange(e)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            onChange={e => this.handleChange(e)} />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="ConfirmPassword"
            onChange={e => this.handleChange(e)} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Sign up</button>
      </form>
    )
  }

}