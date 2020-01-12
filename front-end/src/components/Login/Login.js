import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state
            = {
        }

    }

    UsernameRef = React.createRef();
    PasswordRef = React.createRef();
    DateRef = React.createRef();

    render() {
        return (
            <form className="center">
                <div className="form-group" >
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input type="Username" className="form-control" id="exampleInputUsername1" aria-describedby="UsernameHelp" placeholder="Enter Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary resizebtn" >Login</button>
                <button type="button" className="btn btn-light ">Reset Password</button>
            </form>
        )
    }
}