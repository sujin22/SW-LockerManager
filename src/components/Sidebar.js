import React from 'react';
import {Link} from 'react-router-dom';
import {Component} from 'react';
import './Sidebar.css'
import icon_expanded from '../icon_expanded.png';
import icon_collapsed from '../icon_collapsed.png';
import icon_logout from '../icon_logout.png';
import auth from './../server/auth';

class Sidebar extends Component {
    constructor() {
        super();
        this.state ={
            user: {},
            isSidebarExpanded: false
        };
        this.auth = auth();
    }

    componentDidMount = () => {
        if (this.auth.isLogin()) {
            this.setState({user: this.auth.getCurrentUser()})
        }
    }
    

    logout = () => {
        this.auth.logout();
    }

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
    
    sidebarExpanded = (user) => (
        <div className="sidebar expanded"
        onMouseLeave={() => this.setState({isSidebarExpanded: false})}>
            <span
                role="presentation"
            >
                <img src={icon_collapsed} className="icon_collapsed" alt="collapsed" />
            </span>

            <div className="sidebar_contents">
                <div className="user_info">
                    {user.name}님, 안녕하세요.
                </div>

                <div className="buttons">
                    <button className="btn_logout" 
                            onClick={this.logout}
                    >
                        <img src={icon_logout} className="icon_logout" alt="logout"/>
                        로그아웃
                    </button>
                </div>            

                <div className="nav">
                    <Link to="/">내 사물함 정보</Link>
                    <Link to="/">사물함 배정</Link>
                    <Link to="/">회원가입신청관리</Link>
                </div>

            </div>

        </div>
    );

    render(){
        const { user, isSidebarExpanded } = this.state;
    
        return(
            <div>
                {isSidebarExpanded && this.sidebarExpanded(user)}
                {isSidebarExpanded || this.sidebarCollapsed()}
            </div>
        );
    }
}
export default Sidebar;