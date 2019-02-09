import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import { HomePageComponent } from './components/home/homepage'
import { HeaderComponent } from './components/header/header'
import LoginComponent from './components/auth/login'
import RegisterComponent from './components/auth/register'

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <Route path='/register' component={RegisterComponent}/>
        <Route path='/login' component={LoginComponent}/>
        <Route exact path='/' component={HomePageComponent}/>
      </div>
    );
  }
}

export default App;
