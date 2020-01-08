import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import Reviews from "./components/Reviews/Reviews";


export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/reviews" exact component={Reviews} />
            <Route component={NotFound} />
        </Switch>
    )
}