import React from "react";
import Axios from "axios";
import "./Login.css";
//import {withRouter} from 'react-router-dom'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const backUrl = require("../../../src/configuration.json").backend_url;


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ' ',
            username: ' '
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    


    onSubmit = (e) => {
        e.preventDefault();
        const form = {
            password: this.state.password,
            username: this.state.username
        }

        Axios.post(`${backUrl}/login`, JSON.stringify(form),
            {
                headers: { "Content-Type": "application/json" }
            })
            .then((res) => {
                toast(res.data.message)
                
                localStorage.setItem("token", res.data.token);
                this.props.history.push(`/reviews`)
            })
            .catch(error => {
               //toast(error.response.data.message)
            });
    }
    
     nextPath(path) {
    this.props.history.push(path);
  }
   
    render(){
        return(
           
    <div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
                <div className="col-lg-12 login-key">
                    <i className="fa fa-key" aria-hidden="true"></i>
                </div>
                <div className="col-lg-12 login-title">
                    TREVBUC
                </div>

                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <form>
                            <div className="form-group">
                                <label className="form-control-label">USERNAME</label>
                                <input type="text" className="form-control"
                                onChange={e => this.handleChange(e)}
                        placeholder="Enter Username" />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control" onChange={e => this.handleChange(e)} placeholder="Password"/>
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">
                                </div>
                                <div className="col-lg-6 login-btm login-button">
                                    <button type="submit" onClick={(e) => this.onSubmit(e)} className="btn btn-outline-primary">LOGIN</button>
                                    <button onClick={() => this.nextPath("/resetpassword") } type="button" className="btn btn-outline-primary " >Reset Password</button>
                                     <button onClick={() => this.nextPath("/reviews") } type="button" className="btn btn-outline-primary " >See Reviews</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>
        </div>
            )
    }
    
    /*render() {
        return (
            <form className="center" id ="login">
                <div className="form-group" >
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input className="form-control" id="exampleInputUsername1" aria-describedby="UsernameHelp"
                        type="email"
                        name='username'
                        onChange={e => this.handleChange(e)}
                        placeholder="Enter Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input className="form-control" id="exampleInputPassword1"
                        type="password"
                        name='password'
                        onChange={e => this.handleChange(e)} placeholder="Password" />
                </div>
                <button type="submit" onClick={(e) => this.onSubmit(e)} className="btn btn-primary resizebtn" >Login</button>
                <br/>
                <br/>
                <button onClick={() => this.nextPath("/resetpassword") } type="button" className="btn btn-light " >Reset Password</button>
            </form>
        )
    }*/
}