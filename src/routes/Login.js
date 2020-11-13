import React, { Component } from 'react';
import './Login.css';
import logo from '../sw_logo.png';
import { firebase_module } from '../firebase.js'
import Modal from '../component/Modal';
// import Modal from 'react-modal';

class Login extends React.Component {

    constructor (props) {
        super(props);
        this.firestore = firebase_module();
        this.state = {
          showModal: false,
          id: "",
          password:""
        };
      }

      handleOpenModal = () =>{
        this.setState({ showModal: true });
      }
      
      handleCloseModal = () =>{        
        this.setState({ showModal: false });
      }

    async componentDidMount() {
        const userData = await this.firestore.getUserData();
        const jh = await this.firestore.getUserData('14011224');
        console.log(userData)
        console.log(jh)
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

                  <button 
                    className="SignupBtn" 
                    onClick={this.handleOpenModal}>
                      Signup
                  </button>                    
                </header>
                <Modal isOpen={this.state.showModal} close={this.handleCloseModal} />
            </div>    
        );
    }

    
}

export default Login;