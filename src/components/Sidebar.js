import React from 'react';
import {Component} from 'react';

class Sidebar extends Component{
    render(){
        return(
            <div>
                <span role="presentation">
                    사이드바 접기
                </span>
            <ul>
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
                <li>Menu Item 4</li>
                <li>Menu Item 5</li>
            </ul>
        </div>

        );
    }
}