import React, { Component } from 'react';
import './Main.css';
import Sidebar from '../components/Sidebar';
import Minimap from '../components/Minimap';
import auth from '../server/auth';
import LockerContainer from './../components/LockerContainer';
import { LockerDB } from '../server/firebase';
import Loading from './../components/Loading';

class Main extends Component{
    constructor(props){
        super(props);
        this.scrollToElement = this.scrollToElement.bind(this);
        this.isElementUnderBottom = this.isElementUnderBottom.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.setArea = this.setArea.bind(this);
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        
        this.myRef = React.createRef();
        this.state = {
            isScrolled: false,
            selected_area: 'A',
            user: this.props.user,
            lockers: [],
            newLocker: {},
            loading: false,
        }
        this.auth = auth();
        this.db = LockerDB();

        
    }

    
    componentDidMount() {
        const { selected_area } = this.state;
        if (!auth().isLogin()) {
            alert("로그인이 필요합니다!");
            this.props.history.goBack();
            return;
        }
        LockerDB().getLockerData(selected_area).then((data) => {
            this.setState({lockers: data});
        })
        // 사물함 데이터 리스너 등록
        this.db.addLockerDataListener(selected_area, (change) => {
            if (change.type === "added") { return; }
            const newLocker = {
                area: selected_area,
                ...change.doc.data()
            };
            if (change.doc.data()) {
                console.log("Locker Data Updated at", newLocker.number);
                this.setState({ newLocker });
            }
        })
    }
    
    // 업데이트 되기전에 리스너 해제
    shouldComponentUpdate(nextProps, nextState) {
        const nextArea = nextState.selected_area;
        const { selected_area } = this.state;
        // 구역 선택 시
        if (nextArea !== selected_area) {
            console.log(nextArea, selected_area)
            this.db.removeLockerDataListener();
        }
        return true;
    }
    componentDidUpdate(prevProps, prevState) {
        const prevArea = prevState.selected_area;
        const prevLocker = prevState.newLocker;
        const { selected_area, lockers, newLocker } = this.state;
        // 구역 선택 이후
        if (prevArea !== selected_area) {
            console.log("Area changed!");
            // 사물함 데이터 처음 한번 호출
            this.db.getLockerData(selected_area).then((data) => {
                this.setState({lockers: data});
            });
            // 사물함 데이터 리스너 등록
            this.db.addLockerDataListener(selected_area, (change) => {
                if (change.type === "added") { return; }
                const newLocker = {
                    area: selected_area,
                    ...change.doc.data()
                };
                if (change.doc.data()) {
                    console.log("Locker Data Updated at", newLocker.number);
                    this.setState({newLocker});
                }
            })
        }
        if (prevLocker !== newLocker) {
            const newLockerList = lockers.map(locker => (locker.number === newLocker.number) ? newLocker : locker);
            this.setState({lockers: newLockerList})
        }
    }
    componentWillUnmount() {
        this.db.removeLockerDataListener();
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

    /*Minimap 클릭 시 state의 area, col 변경해주는 함수*/
    setArea(_area){ 
        this.setState({selected_area: _area});
    }
    
    // 디비 관련 작업 때 로딩 팝업 핸들러
    startLoading() {
        this.setState({loading: true});
    }
    stopLoading() {
        this.setState({loading: false});
    }

    render(){
        window.addEventListener('scroll', this.handleScroll);
        const { lockers, loading } = this.state;
        const { user } = this.props;

        //console.log("User in Main", user);
    
        return(
            <div className="Main">
                <div className="sidebar">
                    { user && <Sidebar admin={this.auth.isAdmin()} user={user}/> }
                </div>

                <div className="content">
                    <div className="intro background-change-wrap">
                        <div className="intro_wrapper" >
                            <div className="intro_title">
                                <div>
                                    Sejong;<br/> Software;<br/>Locker Service;
                                </div>
                            </div>
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
                                    <Minimap setArea={this.setArea}/> 
                                </div>
                            </div>
                            
                            
                            <div className="assignment_locker">
                                <p className="locker_title up-on-scroll">
                                    이용하고 싶은 칸을 선택하세요
                                </p>
                                <div className="locker_guideline ">
                                    <tr className="up-on-scroll">
                                        <td style={{width:15,backgroundColor:'#D9E5FF'}}></td>
                                        <td style={{fontSize:15}}>: 사용 중 &nbsp;</td>
                                        <td style={{width:15,backgroundColor:'#D5D5D5'}}></td>
                                        <td style={{fontSize:15}}>: 고장 &nbsp;</td>
                                        <td style={{width:15,backgroundColor:'#002266'}}></td>
                                        <td style={{fontSize:15}}>: 내 사물함  </td>
                                    </tr>
                                    <tr>&nbsp;</tr>
                                </div>
                                <div className="up-on-scroll" >
                                {
                                    <LockerContainer 
                                        user={user} 
                                        lockers={lockers} 
                                        startLoading={this.startLoading}
                                        stopLoading={this.stopLoading}
                                    />
                                }
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                { loading && <Loading /> }
            </div>
            
        );
    }
}
export default Main;

