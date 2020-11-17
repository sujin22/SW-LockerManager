import React from 'react';
import {Component} from 'react';
import './Intro.css';

class Intro extends Component{

    render(){
      return(
        <div className="intro">
            <div className="intro_wraper">
                <p className="intro_title">
                Sejong Software<br/>Locker
                </p>
                <p className="intro_content">
                소프트웨어학과 학우 여러분을 위한 사물함이 준비되어있습니다.
                </p>
                <button className="intro_btn">
                    Click
                </button>
            </div>
        </div>
      );
    }
}

export default Intro;