import React from 'react';
// import logo from './logo.svg';
import logo from './sw_logo.png';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import Login from './routes/Login';
import MainExample from './routes/MainExample';
import { firebase_module } from './firebase.js'


function App(){
  return(
    <HashRouter>
      <Route path="/" exact={true} component={Login}/>
      <Route path="/main" component={MainExample} />
    </HashRouter>
  );
}

// const initLockerData = () => {
//   const db = firebase_module();
//   // A
//   for (let i=1; i <= 60; i++) {
//     db.setLockerData({ area: 'A', number: i, able: true})
//   }
//   // B
//   for (let i=61; i <= 120; i++) {
//     db.setLockerData({ area: 'B', number: i, able: true})
//   }
//   // C
//   for (let i=121; i <= 156; i++) {
//     db.setLockerData({ area: 'C', number: i, able: true})
//   }
//   // D
//   for (let i=157; i <= 192; i++) {
//     db.setLockerData({ area: 'D', number: i, able: true})
//   }
//   // E
//   for (let i=193; i <= 228; i++) {
//     db.setLockerData({ area: 'E', number: i, able: true})
//   }
// }
// initLockerData();

export default App;
