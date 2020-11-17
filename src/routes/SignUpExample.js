import React, { useState, useEffect } from 'react'
import { RegisterDB } from '../../server/firebase';
import logo from '../sw_logo.png';
import './Login.css';

const initialState = {
  id: '',
  pw: '',
  name: '',
  phone: ''
}

const SignUpExample = () => {
  const [inputs, setInputs] = useState(initialState)
  
  const onInput = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const register = () => {
    RegisterDB().addRegisterData(inputs, () => {
      alert("회원가입 신청이 완료되었습니다.");
    });
    setInputs(initialState);
  }

  return (
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
          value={inputs.id}
          onChange={onInput}
        />
        <input
          name="pw"
          className="loginPw"
          type="password"
          placeholder="비밀번호"
          value={inputs.pw}
          onChange={onInput}
        />
        <input
          name="name"
          className="loginPw"
          type="text"
          placeholder="이름"
          value={inputs.name}
          onChange={onInput}
        />
        <input
          name="phone"
          className="loginPw"
          type="text"
          placeholder="폰번호('-'없이)"
          value={inputs.phone}
          onChange={onInput}
        />
        <button 
          className="loginBtn" 
          onClick={register}>
            SIGN UP
        </button>
          
      </header>
  </div>    
  )
}

export default SignUpExample;