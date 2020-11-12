import React from 'react';
import './Login.css';
import logo from '../sw_logo.png';

class Login extends React.Component{

    render(){
        return(
            <div className="Login">
                <header className="Login-header">
                    <img src={logo} className="Login-logo" alt="logo" />
                    <p>
                    세종대학교 소프트웨어학과 사물함 배정 페이지
                    </p>
                    
                </header>
            </div>    
        );
    }
}

export default Login;