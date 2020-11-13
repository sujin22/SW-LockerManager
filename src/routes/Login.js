import React from 'react';
import './Login.css';
import logo from '../sw_logo.png';
import Modal from 'react-modal';

//https://velog.io/@7p3m1k/React-modal-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EC%B0%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0

class Login extends React.Component{

    constructor () {
        super();
        this.state = {
          //showModal: false,
          id: "",
          password:""
        };
      }

      loginHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };  

      loginClickHandler = () =>{
       const {
           id, 
           password
       }=this.state;
      }
    

    render(){
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
                    onChange={this.loginHandler}
                  />
                  <input
                    name="password"
                    className="loginPw"
                    type="password"
                    placeholder="비밀번호"
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