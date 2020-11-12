import React from 'react';
import './Login.css';
import logo from '../sw_logo.png';
import LoginForm from '../components/LoginForm';

class Login extends React.Component{

    render(){
        return(
            <div className="Login">
                <header className="Login-header">
                    <img src={logo} className="Login-logo" alt="logo" />
                    <p>
                    로그인 페이지
                    </p>
                    <LoginForm />
                </header>
            </div>    
        );
    }
}

export default Login;