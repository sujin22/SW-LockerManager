import {React, Component} from 'react';
import './Main.css';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import Minimap from '../components/Minimap';

class Main extends Component{
    render(){
        return(
            
            <div className="Main">
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="content">
                    <Intro />
                    <div className="assignment">
                        <p className="assignment_title">
                            사물함 신청
                        </p>

                        <p className="minimap_title">
                            사물함을 선택하세요
                        </p>
                        <Minimap/>
                        
                        <p className="locker_title">
                            이용하고 싶은 칸을 선택하세요
                        </p>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Main;