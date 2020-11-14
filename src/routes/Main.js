import React from 'react';
import './Main.css';

class Main extends React.Component{
    state ={
        isSidebarExpanded: true
    };

    sidebarExpanded = () => (
        <div className="sidebar">
            <span
            role="presentation"
            onClick={() => this.setState({isSidebarExpanded: false})}
            >
                사이드바 접기
            </span>

            <ul>
                <li>Menu item 1</li>
                <li>Menu item 2</li>
                <li>Menu item 3</li>
            </ul>
        </div>
    );

    sidebarCollapsed = () => (
        <div className="sidebar collapsed">
                    <span
                    role="presentation"
                    onClick={() =>
                        this.setState({
                            isSidebarExpanded:true
                        })
                        }
                    >
                        펼치기
                    </span>

                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
    );

    render(){
        const { isSidebarExpanded } = this.state;
        return(
            
            <div className="Main">
                
                {isSidebarExpanded && this.sidebarExpanded()}
                {isSidebarExpanded || this.sidebarCollapsed()}
                
                <div className="content">
                    <p> Content </p>
                </div>
            </div>
        );
    }
}

export default Main;