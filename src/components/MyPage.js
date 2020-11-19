import React from 'react';
import './MyPage.css'
import Sidebar from './Sidebar';
import img_mypage from '../img_mypage.jpg'

function MyPage(props){
    console.log(props);
    return (
        <div className="Mypage">
            <div className="sidebar">
                    <Sidebar />
            </div>
            
            <div className="mypage_container">
                <table>
                    <td className="mypage_img">
                        <img src={img_mypage}/>
                    </td>
                    <td className="mypage_lockerinfo">

                        <span className="user_info">16011144</span>님의 사물함은,<br/><br/>
                        대양AI센터 B1 사물함 복도의<br/>
                        <span className="user_info">A - 24</span> 입니다.

                    </td>
                </table>
                {/* <span className="mypage_lockerinfo">
                    <span className="user_info">16011144</span>님의 사물함은,<br/><br/>
                    대양AI센터 B1 사물함 복도의<br/>
                    <span className="user_info">A - 24</span> 입니다.
                </span> */}
            </div>
        </div>
    );
}

export default MyPage;