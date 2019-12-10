import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Reviews from "./containers/Reviews";


export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/reviews" exact component={Reviews} />
            <Route component={NotFound} />
        </Switch>
    )
}