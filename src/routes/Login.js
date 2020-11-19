import React from 'react';
import './Login.css';
import logo from '../sw_logo.png';
import auth from '../server/auth';
import Signup from '../components/Signup.js';
// import Modal from 'react-modal';

class Login extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal: false,
            id: "",
            password:""
        };
        this.auth = auth();
    }

    handleOpenModal = () =>{
        this.setState({ showModal: true });
    }
    
    handleCloseModal = () =>{        
        this.setState({ showModal: false });
    }

    async componentDidMount() {
        if (this.auth.isLogin()) {
          this.navigate('main');
        }
    }

    navigate = (path) => {
        this.props.history.push('/'+path);
    }

    loginHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };  

    loginNumHandler = (e) => {
        const { name, value } = e.target;
        const newValue = value.replace(/[^0-9]/g, '');
        this.setState({ [name]: newValue });
    };  

    loginClickHandler = () =>{
        const { id, password } = this.state;
        this.auth.login(id, password).then((success) => {
            // if(success) { this.navigate('main'); }
        });
    }

    render(){
        const { id, password } = this.state;
        return(
            <div className="Login">
                <header className="Login-header">
                    <img src={logo} className="Login-logo" alt="logo" />
                    <p>
                    세종대학교 소프트웨어학과 사물함 배정 사이트
                    </p>
                  <input
                    name="id"
                    className="loginId"
                    type="text"
                    placeholder="학번"
                    value={id}
                    onChange={this.loginNumHandler}
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
                  <button 
                    className="loginBtn" 
                    onClick={() => this.navigate('register')}>
                      REGISTER
                  </button>              
                </header>
                <Signup isOpen={this.state.showModal} close={this.handleCloseModal} />
            </div>    
        );
    }
}

export default Login;