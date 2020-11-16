import React from 'react';
import './Login.css';
import logo from '../sw_logo.png';
import { useUserDB } from '../firebase.js'
// import Modal from 'react-modal';

class Login extends React.Component {
    constructor () {
        super();
        this.firestore = useUserDB();
        this.state = {
          //showModal: false,
          id: "",
          password:""
        };
      }

    async componentDidMount() {
        const userData = await this.firestore.getUserData();
        console.log(userData);
    }

    loginHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };  

    loginClickHandler = () =>{
        const userData = this.state;
        this.firestore.setUserData(userData, () => {
            alert('유저 데이터 추가 완료!');
            this.setState({id:'', password: ''});
        });
    }

    render(){
        const { id, password } = this.state;
        return(
            <div className="Login">
                <header className="Login-header">
                    <img src={logo} className="Login-logo" alt="logo" />
                    <p>
                    세종대학교 소프트웨어학과 사물함 배정 페이지
                    </p>

                    <input
                    name="id"
                    className="loginId"
                    type="text"
                    placeholder="학번"
                    value={id}
                    onChange={this.loginHandler}
                  />
                  <input
                    name="password"
                    className="loginPw"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={this.loginHandler}
                  />
                  <button 
                    className="loginBtn" 
                    onClick={this.loginClickHandler}>
                      Login
                  </button>
                    
                </header>
            </div>    
        );
    }
}

export default Login;