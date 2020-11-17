import React from 'react';
import {Component} from 'react';
import './Minimap.css';

class Minimap extends Component{
    render(){
      return(
        <div>
            <table border="1" className="minimap">
                        <tr>
                            <td colSpan="5" className="enviornment">대양AI센터 B1 사물함 복도</td>
                            <td colSpan="3" className="invisible"></td>
                            <td className="invisible"></td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="locker">A</td>
                            <td className="invisible"></td>
                            <td colSpan="2" className="locker">B</td>
                            <td className="invisible"></td>
                            <td colSpan="2" className="locker">C</td>
                            <td rowSpan="5" className="enviornment">복도 끝</td>
                        </tr>
                        <tr >
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            
                        </tr>
                        <tr>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                        </tr>
                        <tr>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                            <td className="invisible"></td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="locker">D</td>
                            <td className="invisible"></td>
                            <td colSpan="2" className="locker">E</td>
                            <td className="invisible"></td>
                            <td colSpan="2" className="enviornment">계단식 강의실(B107) 입구</td>
                        </tr>
                    </table>
        </div>
      );
    }
}

export default Minimap ;