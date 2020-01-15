import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import Reviews from "./components/Reviews/Reviews";
import Login from "./components/Login/Login.js";
import ResetPassword from "./components/ResetPassword/ResetPassword.js"
import Register from "./components/Register/Register.js";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/reviews" exact component={Reviews} />
            <Route path="/home" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/forgot-password" exact component={ResetPassword} />
            <Route component={NotFound} />
        </Switch>
    )
}