import React from "react";
import Axios from "axios";
import "./Login.css";
import { Button } from "react-bootstrap";
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

                if (error.response !== undefined) {
                    toast(error.response.data.message)
                } else {
                    toast("An error occured. Please try again later!")
                }

            });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="false"></i>
                        </div>
                        <div className="col-lg-12 login-title">
                            TrevBUC
                        </div>

                        <div className="col-md-12 login-form">
                            <div className="col-md-12 login-form">
                                <form>
                                    <div className="form-group">
                                        <label className="form-control-label">Email</label>
                                        <input type="email"
                                            id="username"
                                            name='username'
                                            className="form-control"
                                            onChange={e => this.handleChange(e)}
                                            placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            onChange={e => this.handleChange(e)} placeholder="Password" />
                                    </div>

                                    <div className="col-md-12 col-sm-12 loginbttm">
                                        <div className="col-sm-12">
                                            <Button type="submit" onClick={(e) => this.onSubmit(e)}
                                                className="btn btn-primary left-align">Login
                                            </Button>
                                            <Button onClick={() => this.nextPath("/register")} type="button"
                                                className="btn btn-primary right-align">Register
                                            </Button>
                                        </div>

                                        <Button onClick={() => this.nextPath("/reviews")} type="button"
                                            className="btn btn-danger" size="lg" block>See Reviews
                                            </Button>
                                    </div>
                                    <div className="text-right">
                                        <Button onClick={() => this.nextPath("/forgot-password")} type="button"
                                            className="btn-primary-outline">Forgot password
                                            </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                    </div>
                </div >
            </div >
        )
    }
}