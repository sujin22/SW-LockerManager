import React from 'react';
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
