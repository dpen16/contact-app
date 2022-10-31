import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/admin/Dashboard/Dashboard';
import CreateContact from './components/admin/Contacts/CreateContact';
import { PrivateRoute } from './server/PrivateRoute';
import './App.css';
import UpdateContact from './components/admin/Contacts/UpdateContact';
import SignUp from './components/Login/SignUp';
import React from 'react';

function App() {
  return (
    <Router>
    <Switch>
      <Route  exact path="/" component={Login} />
      <Route  exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
      <PrivateRoute exact path="/contact-create" component={CreateContact}></PrivateRoute>
      <PrivateRoute exact path="/contact/:id" component={UpdateContact}></PrivateRoute>
    </Switch>
    
  </Router>
  );
}

export default App;