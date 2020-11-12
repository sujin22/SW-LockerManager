// import logo from './logo.svg';
import logo from './sw_logo.png';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import Login from './routes/Login';

function App(){
  return(
    <HashRouter>
      <Route path="/" exact="true" component={Login}/>
    </HashRouter>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
