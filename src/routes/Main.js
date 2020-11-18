import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react';
import './Main.css';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import Minimap from '../components/Minimap';
import Locker from '../components/Locker';

  class Main extends Component{
    constructor(props){
        super(props);
        this.scrollToElement = this.scrollToElement.bind(this);

        this.myRef = React.createRef();
    }

    scrollToElement(){
        console.log("눌렸음");
        window.scrollTo({
          top: this.myRef.current.offsetTop,
          left: 0,
          behavior: 'smooth'
        });
    }

    render(){
        return(
            
            <div className="Main">
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="content">
                    {/* <Intro /> */}
                    <div className="intro">
                        <div className="intro_wrapper">
                            <p className="intro_title">
                            Sejong Software<br/>Locker
                            </p>
                            <p className="intro_content">
                            소프트웨어학과 학우 여러분을 위한 사물함이 준비되어있습니다.
                            </p>
                            <button className="intro_btn"
                                    onClick={this.scrollToElement}
                            >
                                Click
                            </button>
                        </div>
                    </div>
                    <div className="assignment" ref={this.myRef}>
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

