import React, { useState } from 'react';
// import logo from './logo.svg';
import logo from './sw_logo.png';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import Login from './routes/Login';
import Main from './routes/Main';

function App(){

  return(
    <HashRouter>
      <Route path="/" exact="true" component={Main}/>
    </HashRouter>
  );
}

export default App;
