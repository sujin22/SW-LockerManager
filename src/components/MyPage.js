import React, { useState, useEffect } from 'react';
import './MyPage.css'
import Sidebar from './Sidebar';
import img_mypage from '../assets/imgs/img_mypage.jpg'
import auth from './../server/auth';

function MyPage({user}){
    useEffect(() => {
        if (!auth().isLogin()) {
            alert("로그인이 필요합니다!");
            this.props.history.goBack();
        }
    }, [])


    return (
        <div className="Mypage">
            <div className="sidebar">
                { user && <Sidebar admin={auth().isAdmin()} user={user} /> }
            </div>
            
            <div className="mypage_container">
                <table>
                    <td className="mypage_img">
                        <img src={img_mypage}/>
                    </td>
                    { user && (user.locker ? 
                        <td className="mypage_lockerinfo">
                            <span className="user_info">{user.name}</span>님의 사물함은,<br/><br/>
                            대양AI센터 B1 사물함 복도의 <span className="user_info">{user.locker.area} - {user.locker.number}</span> 입니다.
                        </td>
                        :
                        <td className="mypage_lockerinfo">
                            <span className="user_info">{user.name}</span>님은,<br/><br/>
                            배정받은 사물함이 없습니다.
                        </td>
                        )
                    }
                </table>
            </div>
        </div>
    );
}

export default MyPage;