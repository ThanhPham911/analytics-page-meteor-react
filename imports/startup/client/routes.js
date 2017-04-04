import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

import Analytics from '../../ui/Analytics.jsx';
import Login from '../../ui/accounts/Login.jsx';
import App from '../../ui/App.jsx';

export const renderRoutes = (props) => (
    <Router history={history}>
        <div>
            <Route path="/" component={(props) => <App {...props} />}></Route>
            <Route path="/signin" component={(props) => <Login {...props} />}></Route>
            <Route path="/analytics" component={(props) => <Analytics {...props} />}></Route>
            <div id="popupContainer"></div>
        </div>

    </Router>
);
