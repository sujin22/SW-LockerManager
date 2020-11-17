import React from 'react';
import {Component} from 'react';
import './Intro.css';
import * as goScroll from '../routes/Main.js';

class Intro extends Component{

  goScroll = () =>{
    console.log("눌렸습니다.");
     }
    render(){
      return(
        <div className="intro">
            <div className="intro_wrapper">
                <p className="intro_title">
                Sejong Software<br/>Locker
                </p>
                <p className="intro_content">
                소프트웨어학과 학우 여러분을 위한 사물함이 준비되어있습니다.
                </p>
                <button className="intro_btn"
                        onClick={this.goScroll}
                >
                    Click
                </button>
            </div>
        </div>
      );
    }
}

export default Intro;