import React, { Component } from 'react';
import './Main.css';
import Sidebar from '../components/Sidebar';
import Minimap from '../components/Minimap';
import auth from './../server/auth';
import LockerContainer from './../components/LockerContainer';


  class Main extends Component{
    constructor(props){
        super(props);
        this.scrollToElement = this.scrollToElement.bind(this);
        this.isElementUnderBottom = this.isElementUnderBottom.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        
        this.myRef = React.createRef();
        this.state = {
            isScrolled: false,
            selected_area: 'A',
            selected_area_col: 10,
        }
    }

    componentDidMount() {
        if(!auth().isLogin()) {
            alert("로그인이 필요합니다!");
            this.props.history.goBack();
        }
        this.setState({selected_area:'A', selected_area_col: 10})
    }

    scrollToElement(){
        console.log("눌렸음");
        window.scrollTo({
          top: this.myRef.current.offsetTop,
          left: 0,
          behavior: 'smooth'
        });
        this.setState({isScrolled: true})
    }

    /*스크롤 시 opacity, transform 조절*/
    isElementUnderBottom(elem, triggerDiff) {
        const { top } = elem.getBoundingClientRect();
        const { innerHeight } = window;
        return top > innerHeight + (triggerDiff || 0);
    }
    
    handleScroll() {
        const elems = document.querySelectorAll('.up-on-scroll');
        elems.forEach(elem => {
          if (this.isElementUnderBottom(elem, -20)) {
            elem.style.opacity = "0";
            elem.style.transform = 'translateY(70px)';
          } else {
            elem.style.opacity = "1";
            elem.style.transform = 'translateY(0px)';
          }
        })
    }

    selectArea(){
        // this.setState({selected_area:'B'})
    }

    render(){
        window.addEventListener('scroll', this.handleScroll);
        const{selected_area, selected_area_col} = this.state;
        return(
            <div className="Main">
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="content">
                    <div className="intro background-change-wrap">
                        <div className="intro_wrapper" >
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
                        <div className="assignment_wrapper ">
                            <p className="assignment_title up-on-scroll">
                                사물함 신청
                            </p>

                            <div className="assignment_minimap">
                                <p className="minimap_title up-on-scroll">
                                    사물함을 선택하세요
                                </p>
                                <div className="up-on-scroll">
                                    <Minimap/> 
                                </div>
                            </div>
                            
                            
                            <div className="assignment_locker">
                                <p className="locker_title up-on-scroll">
                                    이용하고 싶은 칸을 선택하세요
                                </p>
                                <div className="up-on-scroll">
                                    {
                                        this.state.isScrolled && <LockerContainer area={selected_area} col={selected_area_col}/>
                                    }
                                </div>
                                <button onClick={this.selectArea('B')}>aa</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export default Main;

