import React from 'react';
import './Signup.css';
import './Modal/Modal.scss';
import { RegisterDB } from '../server/firebase';

class Signup extends React.Component{

    constructor () {
        super();
        this.initial_state = {
            id: "",
            password:"",
            confirmPassword:"",
            name: "",
            phone:""
        };
        this.state = this.initial_state;
        
    }     
    
    //값이 변경될 떄마다 값 리턴
    signupHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };  

    signupNumHandler = (e) => {
        const { name, value } = e.target;
        const newValue = value.replace(/[^0-9]/g, '');
        this.setState({ [name]: newValue });
    };  
    doesPasswordMatch() {
        const { password, confirmPassword } = this.state;
        return password === confirmPassword;
    }   

    renderFeedbackMessage() {
        const { confirmPassword } = this.state;

        if (confirmPassword) {
            if (!this.doesPasswordMatch()) {
                return (
                    <div className="errorMsg">패스워드가 일치하지 않습니다</div>
                );
            }
        }
    }

    renderSubmitBtn() {
        const { id, password, name, phone } = this.state;
        if(this.doesPasswordMatch() &&
            id.length>1 &&
            password.length>1 &&
            name.length>1 &&
            phone.length>1) {
            return (
                <button onClick={this.submit} >Confirm</button>         
            )
        }
        else {
            return (
                <button disabled>Confirm</button>       
            )
        }
    }

    submit = () => {
        const data = this.state;
        delete data.confirmPassword;
        RegisterDB().addRegisterData(data, () => {
            alert("회원가입 신청이 완료되었습니다.");
            this.setState(this.initial_state);
            this.props.close();
        });
    }

    render(){
        const { id, password ,confirmPassword,name,phone } = this.state;
        return(

            <React.Fragment>
            {
                this.props.isOpen ?
                <React.Fragment>
                    <div className="Modal-overlay" onClick={this.props.close} />
                    <div className="Modal">
                    <p className="title">회원 가입</p>
                    <div className="content">                       
                                
                    <input
                        name="id"
                        className="SignupText"
                        type="text"
                        placeholder="학번"
                        value={id}
                        onChange={this.signupNumHandler}
                    />
                    <input
                        name="password"
                        className="SignupPw"
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={this.signupHandler}       
                        />    
                                        
                        <input
                        name="confirmPassword"
                        className="SignupPw"
                        type="password"
                        placeholder="비밀번호확인"
                        value={confirmPassword}
                        onChange={this.signupHandler}
                        />                     
                        {this.renderFeedbackMessage()}
                                <input
                                name="name"
                                className="SignupText"
                                type="text"
                                placeholder="이름"
                                value={name}
                                onChange={this.signupHandler}
                            /> 
                            <input
                                name="phone"
                                className="SignupText"
                                type="tel" 
                                pattern="(010)-[0-9]{4}-[0-9]{4}"
                                placeholder="전화번호"
                                value={phone}
                                onChange={this.signupNumHandler}
                            />   
                    </div>          
                            
                    <div className="button-wrap">    
                    {this.renderSubmitBtn()}  
                    </div>           
                    </div>
                </React.Fragment>: null
            }
            </React.Fragment>
        );
    }
}

export default Signup;