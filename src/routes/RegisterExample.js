import React, { useState, useEffect } from 'react'
import { RegisterDB, UserDB } from '../server/firebase.js';
import logo from '../sw_logo.png';
import './Login.css';

const RegisterExample = () => {
  const [signupList, setSignupList] = useState([])

  useEffect(() => {
    RegisterDB().getRegisterData().then((list) => {
      setSignupList(list);
    });
  }, [])

  const renderList = () => {
    return (
      signupList.map((data) => (
          <button
            key={data.id}
            id={data.id}
            className="loginBtn" 
            onClick={register}>
              {data.id} 가입 확인
          </button>
      ))
    )
  }

  const register = (e) => {
    const { id } = e.target;
    const newList = signupList;
    const idx = newList.findIndex((item) => item.id === id);
    const data = newList.splice(idx, 1);
    UserDB().setUserData(data[0], () => {
      alert(id+"의 가입이 완료되었습니다!");
      RegisterDB().removeRegisterData(id, () => {
        // 이 씨발 깊은 복사 안하면 state 값이 변경되더라도 render(return) 결과가 바뀌지 않는다!
        // 존나 어이가 없다 이것때문에 씨빨 2시간을 쓴게
        setSignupList(JSON.parse(JSON.stringify(newList)));
      })
    })
  }

  return (
    <div className="Login">
        <header className="Login-header">
            <img src={logo} className="Login-logo" alt="logo" />
            <p>
            세종대학교 소프트웨어학과 사물함 배정 페이지
            </p>
            { renderList() }
        </header>
    </div>
  )
}

export default RegisterExample;