import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import { HomePageComponent } from './components/home/homepage'
import LoginComponent from './components/auth/login'

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/login' component={LoginComponent}/>
        <Route exact path='/' component={HomePageComponent}/>
      </div>
    );
  }
}

export default App;
