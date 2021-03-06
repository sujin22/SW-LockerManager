import React, { useState, useEffect } from 'react';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import Login from './routes/Login';
// import MainExample from './routes/MainExample';
// import SignUpExample from './routes/SignUpExample';
import Register from './routes/UserManage';
import Main from './routes/Main';
import MyPage from './components/MyPage';
import auth from './server/auth';

function App() {
	const [user, setUser] = useState(auth().getCurrentUser());

	let router;
	const navigate = (pageName='') => {
		router.history.push('/'+pageName);
	}

	useEffect(() => {
		auth().addListener((userData) => setUser(userData));
	}, []);

	useEffect(() => {
		if (user) {
			navigate('main');
		} else {
			navigate();
		}
	}, [user])

	console.log("User in App", user);
	return(
		<HashRouter ref={(r) => { router = r; }}>
			<Route path="/" exact={true} component={Login}/>
			<Route path="/main" exact={true} render={(props)=> <Main {...props} user={user}/>} />
			<Route path="/main/mypage" render={(props)=> <MyPage {...props} user={user}/>} />
			<Route path="/register" render={(props)=> <Register {...props} user={user}/>} />
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
