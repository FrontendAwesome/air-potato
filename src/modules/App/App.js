import React, { Component } from 'react';
import Firebase from '../Firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Firebase />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/modules/App/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
