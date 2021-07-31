import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from "react-redux"
import "./index.css";
import App from './components/App'
import SingleMovie from './components/SingleMovie'
import Register from './components/Register'
import Login from './components/Login'
import Favorites from './components/Favorites'
import UserList from './components/UserList'
import UserBlock from './components/UserBlock'
import store from "./store/store"

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
      <Switch>
          <Route exact path='/movies/:name' render={({ match }) => 
            <SingleMovie moviename={match.params}/>}/>
            <Route exact path='/users/:userId' render={({ match }) => 
            <UserBlock userId={match.params}/>}/>
         <Route exact path='/movies' component={App}/>
         <Route exact path='/login' component={Login}/>
         <Route exact path='/register' component={Register}/>
         <Route exact path='/favorites' component={Favorites}/>
         <Route exact path='/users' component={UserList}/>
         <Redirect from='/' to='/movies'/>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
