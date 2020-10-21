import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const UserList = React.lazy(() => import('./views/pages/UserList'));
const AddUser = React.lazy(() => import('./views/pages/AddUser'));
const ShowUser = React.lazy(() => import('./views/pages/ShowUser'));
const EditUser = React.lazy(() => import('./views/pages/EditUser'));
const Login = React.lazy(() => import('./views/pages/Login'));
const VerifyLogin = React.lazy(() => import('./components/VerifyLogin'));
function App() {
  return (
    <HashRouter>
    <React.Suspense fallback={loading()}>
      <Switch>
        <Route exact path="/users/add" name="Add User Page" render={props => <AddUser {...props}/>} />
        <Route exact path="/users/:id" name="Show User Page" render={props => <ShowUser {...props}/>} />
        <Route exact path="/users/:id/edit" name="Edit Page" render={props => <EditUser {...props}/>} />
       <Route path="/login" name="login" render={props => <Login {...props}/>} />
       <Route path="/users" name="User" render={props => <UserList {...props}/>} />
       <Route path="/" name="Home" render={props => <VerifyLogin {...props}/>} />
      </Switch>
    </React.Suspense>
</HashRouter>
  );
}

export default App;
