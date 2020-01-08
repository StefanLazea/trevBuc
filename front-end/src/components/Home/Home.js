import React from "react";
import "./Home.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default class Home extends React.Component {
    
    userLogged = ()=>{
        if(localStorage.getItem("token")){
            return "User is logged";
        }
        return "Error! You should log in";
    }
    notify = () => toast(this.userLogged);
    
    render(){
      return (
        <div>
          <button onClick={this.notify}>Notify !</button>
        </div>
      );
    }
}