import React from 'react';
import {Component} from 'react';
import './Main.css';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import Minimap from '../components/Minimap';
import Locker from '../components/Locker';

class Main extends Component{
    state = {
        locker_id: 'A',
        locker_row: 10,
        locker_col: 6,
    }

    render(){
        const {locker_id,locker_row,locker_col} = this.state;
        return(
            
            <div className="Main">
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="content">
                    <Intro />
                    
                    <div className="assignment">
                        <div className="assignment_wrapper">
                            <p className="assignment_title">
                                사물함 신청
                            </p>

                            <div className="assignment_minimap">
                                <p className="minimap_title">
                                    사물함을 선택하세요
                                </p>
                                <Minimap/>
                            </div>
                            
                            
                            <div className="assignment_locker">
                                <p className="locker_title">
                                    이용하고 싶은 칸을 선택하세요
                                </p>
                                <Locker
                                id={locker_id}
                                row={locker_row}
                                col={locker_col} 
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export default Main;

