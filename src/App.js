import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Route, Router, Switch } from 'react-router-dom';
import logger from 'redux-logger';
import history from './history';
import DefaultLayout from './components/layout';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import Login from './components/auth/signin';
import Logout from './components/auth/signout';
import style from './style/style.less';

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk, logger)
);

const token = localStorage.getItem('jwt');
if(token) {
    store.dispatch({ type: "AUTH_USER", user: jwtDecode(token)});
    setAuthToken(token);
}

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" name="Login" component={Login} />
                    <Route exact path="/logout" name="Logout" component={Logout} />
                    <Route path="/" name="DefaultLayout" component={DefaultLayout} />
                </Switch>
            </Router>
        </Provider>
    );
  }
}

export default App;
