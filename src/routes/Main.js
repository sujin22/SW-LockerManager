import {React, Component} from 'react';
import './Main.css';
import Sidebar from '../components/Sidebar';

class Main extends Component{
    render(){
        return(
            
            <div className="Main">
                
                <Sidebar />
                
                <div className="content">
                    <p> Content </p>
                </div>
            </div>
        );
    }
}

export default Main;