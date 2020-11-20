import React, { useState, useEffect } from 'react'
import { RegisterDB, UserDB } from '../server/firebase.js';
import './UserManage.css';
import Sidebar from './../components/Sidebar';
import auth from './../server/auth';

const UserManage = ({user}) => {
  const [data, setData] = useState({
    userList: [],
    registerList: []
  })
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

  useEffect(() => {
    setData({...data, userList});
  }, [userList])
  useEffect(() => {
    setData({...data, registerList});
  }, [registerList])

  const renderUserList = () => {
    return (
      <ul className="list-group">
        {data.userList.map((data) => (
          <li>
            <span className="idtext">{data.id}</span>
            <span className="nametext">{data.name}</span>
            <span className="phtext">{data.phone}</span>
            <button
              key={data.id}
              id="unregister"
              value={data.id}
              className="btn" 
              onClick={unregister}> 
              가입 취소
            </button>
          </li>
        ))}
      </ul>
    )
  }
  const renderRegisterList = () => {
    return (
      <ul className="list-group">
        {data.registerList.map((data) => (
          <li>
           <span className="idtext">{data.id}</span>
            <span className="nametext">{data.name}</span>
            <span className="phtext">{data.phone}</span>
            <button
              key={data.id}
              id="register"
              value={data.id}
              className="btn" 
              onClick={register}> 
              가입 승인
            </button>
          </li>
        ))}
      </ul>
    )
  }

  const unregister = (e) => {
    const { value } = e.target;
    const newList = userList;
    const idx = newList.findIndex((item) => item.id === value);
    const data = newList.splice(idx, 1);
    UserDB().removeUserData(data[0].id, () => {
      alert(value+"의 가입이 취소되었습니다!");
      RegisterDB().addRegisterData(data[0], () => {
        setUserList(JSON.parse(JSON.stringify(newList)));
        const newRegisterList = registerList;
        newRegisterList.push(data[0]);
        setRegisterList(newRegisterList);
      })
    })
  }

  const register = (e) => {
    const { value } = e.target;
    const newList = registerList;
    const idx = newList.findIndex((item) => item.id === value);
    const data = newList.splice(idx, 1);
    delete data[0].datetime;
    UserDB().setUserData(data[0], () => {
      alert(value+"의 가입이 완료되었습니다!");
      RegisterDB().removeRegisterData(value, () => {
        setRegisterList(JSON.parse(JSON.stringify(newList)));
        const newUserList = userList;
        data[0].id = value;
        newUserList.push(data[0]);
        setUserList(newUserList);
      })
    })
  }

  return (
    <div className="Manage">
      <div className="sidebar">
        { user && <Sidebar admin={auth().isAdmin()} user={user}/> }
      </div>

      <div className="manage-container">
        <div className="title-manage"> 
          <div className="titletxt-manage">회원 관리 페이지</div>
        </div>

        <div className="content-manage">

          <div className="content-container">
            <div className="list-title-manage"> 
              <div className="list-title">회원 목록</div>
            </div> 
            <div className="list-container">
            { renderUserList() }
            </div>          
          </div>

          <div className="content-container">
          <div className="list-title-manage"> 
              <div className="list-title">신청 목록</div>
            </div> 
            <div className="list-container">
              { renderRegisterList() }
            </div>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default UserManage;