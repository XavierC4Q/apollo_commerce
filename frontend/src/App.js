import React, { Component } from 'react';
import './App.css';
import LoginComponent from './components/auth/login'

class App extends Component {
  render() {
    return (
      <div>
        <LoginComponent />
      </div>
    );
  }
}

export default App;
