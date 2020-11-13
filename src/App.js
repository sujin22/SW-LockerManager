import React, { useState } from 'react';
// import logo from './logo.svg';
import logo from './sw_logo.png';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import Login from './routes/Login';

function App(){

  return(
    <HashRouter>
      <Route path="/" exact={true} component={Login}/>
    </HashRouter>
  );
}

export default App;
