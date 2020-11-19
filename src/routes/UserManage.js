import React, { useState, useEffect } from 'react'
import { RegisterDB, UserDB } from '../server/firebase.js';
import logo from '../sw_logo.png';
import './Login.css';

const UserManage = () => {
  const [userList, setUserList] = useState([]);
  const [registerList, setRegisterList] = useState([]);

  useEffect(() => {
    UserDB().getUserData().then((list) => {
      setUserList(list);
    })
    RegisterDB().getRegisterData().then((list) => {
      setRegisterList(list);
    });
  }, [])

  const renderUserList = () => {
    return (
      userList.map((data) => (
          <button
            key={data.id}
            id={data.id}
            className="loginBtn" 
            onClick={unregister}>
              {data.id} 가입 확인
          </button>
      ))
    )
  }
  const renderRegisterList = () => {
    return (
      registerList.map((data) => (
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

  const unregister = (e) => {
    const { id } = e.target;
    const newList = userList;
    const idx = newList.findIndex((item) => item.id === id);
    const data = newList.splice(idx, 1);
    delete data[0].datetime;
    UserDB().removeUserData(data[0].id, () => {
      // data[0], () => {
      //   alert(id+"의 가입이 취소되었습니다!");
      //   RegisterDB().removeRegisterData(id, () => {
      //     setRegisterList(JSON.parse(JSON.stringify(userList)));
      //   })
      // }
    })
  }

  const register = (e) => {
    const { id } = e.target;
    const newList = registerList;
    const idx = newList.registerList((item) => item.id === id);
    const data = newList.splice(idx, 1);
    delete data[0].datetime;
    UserDB().setUserData(data[0], () => {
      alert(id+"의 가입이 완료되었습니다!");
      RegisterDB().removeRegisterData(id, () => {
        setRegisterList(JSON.parse(JSON.stringify(newList)));
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
            { renderUserList() }
            { renderRegisterList() }
        </header>
    </div>
  )
}

export default UserManage;