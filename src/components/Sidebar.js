import React from 'react';
import {Component} from 'react';
import './Sidebar.css'
import logo from '../sw_logo.png';

class Sidebar extends Component{
    state ={
        isSidebarExpanded: true
    };

    sidebarExpanded = () => (
        <div className="sidebar">
            <span
            role="presentation"
            onClick={() => this.setState({isSidebarExpanded: false})}
            >
                사이드바 접기
            </span>

            <div className="sidebuttons">
                <button onclick="alert('마이페이지')">마이페이지</button>
                <button onclick="alert('로그아웃')">로그아웃</button>
            </div>

            <ul>
                <li>사물함 배정</li>
                <li>회원가입신청관리</li>
            </ul>

            

        </div>
    );

    sidebarCollapsed = () => (
        <div className="sidebar collapsed">
                    <span
                    role="presentation"
                    onClick={() =>
                        this.setState({
                            isSidebarExpanded:true
                        })
                        }
                    >
                         <img src={logo} className="Login-logo" alt="logo" />
                    </span>
                </div>
    );

    render(){
        const { isSidebarExpanded } = this.state;
        return(
            <div>
                {isSidebarExpanded && this.sidebarExpanded()}
                {isSidebarExpanded || this.sidebarCollapsed()}
            </div>
        );
    }
}
export default Sidebar;