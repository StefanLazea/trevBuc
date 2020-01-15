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
    this.state = {
      password: ' ',
      email: ' ',
      confirmPassword: '',
      emailError: true,
      passwordError: true,
      passwordMatchError: true
    };
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    },
      () => {
        if (name === "confirmPassword") {
          this.validateField("password", value);
        }
        this.validateField(name, value)
      });
  }

  //{`form-group ${this.errorClass(this.state.registerErrors.email)}`}
  validateField(fieldName, value) {
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
        if (value.length >= 6) {
          this.setState({ passwordError: false })
        } else {
          this.setState({ passwordError: true })
          toast("Parola nu trebuie sa fie mai mica de 6 caractere");
        }
        break;
      case 'confirmPassword':
        // console.log(typeof value, typeof pass, value, pass)
        if (value === this.state.password) {
          this.setState({ passwordMatchError: false })
        } else {
          this.setState({ passwordMatchError: true })
          toast("Parola trebuie sa corespunda");
        }
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

    console.log(this.state.emailError, this.state.passwordError, this.state.passwordMatchError);
    if (this.state.emailError === false && this.state.passwordMatchError === false && this.state.passwordError === false) {
      const form = {
        password: this.state.password,
        username: this.state.email
      }

      Axios.post(`${backUrl}/register`, JSON.stringify(form),
        {
          headers: { "Content-Type": "application/json" }
        })
        .then((res) => {
          toast(res.data.message);
          this.props.history.push(`/login`)
        })
        .catch(error => {
          if (error.response !== undefined) {
            toast(error.response.data.message)
          }
        });
    } else {
      toast("Apasa pe camp pentru a vedea eroarea!")
    }
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
            onClick={e => this.handleChange(e)} />
        </div>

        <div className={`form-group ${this.errorClass(this.state.passwordError)}`}>
          <label htmlFor="password">Password</label>
          <input type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            onClick={e => this.handleChange(e)} />
        </div>

        <div className={`form-group ${this.errorClass(this.state.passwordError)}`}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="ConfirmPassword"
            onClick={e => this.handleChange(e)} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Sign up</button>
      </form>
    )
  }

}