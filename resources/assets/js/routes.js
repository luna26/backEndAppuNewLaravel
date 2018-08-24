import React from 'react';
import { Route, Switch, Router, StaticRouter } from 'react-router-dom';
import history from './history';

//Components
import Dashboard from './components/dashboard/dashboard';

export default (
    <Router history={history}>
        <div className='main-container'>
            <Switch>
                <Route path='/' component={Dashboard} />
            </Switch>
        </div>
    </Router>
);
