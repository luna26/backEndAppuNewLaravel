import React from 'react';
import { Route, Switch, Router, StaticRouter } from 'react-router-dom';
import history from './history';

//Components
import Login from './components/login/Login';
import Dashboard from './components/dashboard/dashboard';
import DashboardNews from './components/dashboardNews/dashboard-news';

export default (
    <Router history={history}>
        <div className='main-container'>
            <Switch>
                <Route path='/' component={Dashboard} />
                {/* <Route path='/' component={Login} /> */}
            </Switch>
        </div>
    </Router>
);
