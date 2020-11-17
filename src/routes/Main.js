import React from 'react';
import {Component} from 'react';
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
                    <div className="assignment" ref={this.scrollRef}>
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
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Main;