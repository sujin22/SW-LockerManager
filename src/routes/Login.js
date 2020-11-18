import React from 'react';
import './Login.css';
import logo from '../sw_logo.png';
import auth from '../server/auth';
// import Modal from 'react-modal';

class Login extends React.Component {
    constructor () {
        super();
        this.state = {
          //showModal: false,
          id: "",
          password:""
        };
        this.auth = auth();
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
                    Login
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
                    className="loginBtn" 
                    onClick={() => this.navigate('sign')}>
                      SIGN UP
                  </button>
                  <button 
                    className="loginBtn" 
                    onClick={() => this.navigate('register')}>
                      REGISTER
                  </button>
                    
                </header>
            </div>    
        );
    }
}

export default Login;