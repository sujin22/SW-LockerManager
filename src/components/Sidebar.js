import React from 'react';
import {Component} from 'react';
import './Sidebar.css'
import icon_expanded from '../icon_expanded.png';
import icon_collapsed from '../icon_collapsed.png';

class Sidebar extends Component{
    state ={
        isSidebarExpanded: false
    };

    sidebarCollapsed = () => (
        <div className="sidebar">
                    <span
                    role="presentation"
                    onMouseOver={() => this.setState({isSidebarExpanded:true})}
                    >
                         <img src={icon_expanded} className="icon_expanded" alt="expanded" />
                    </span>
                </div>
    );
    
    sidebarExpanded = () => (
        <div className="sidebar expanded"
        onMouseLeave={() => this.setState({isSidebarExpanded: false})}>
            <span
            role="presentation"
            >
                <img src={icon_collapsed} className="icon_collapsed" alt="collapsed" />
            </span>

            <div className="sidebar_contents">
                <div className="user_info">
                    16011144님, 안녕하세요.
                </div>
                <div className="buttons">
                    <button onclick="alert('로그아웃')">로그아웃</button>
                </div>            

                <ul>
                    <li>내 사물함 정보</li>
                    <li>사물함 배정</li>
                    <li>회원가입신청관리</li>
                </ul>

            </div>

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