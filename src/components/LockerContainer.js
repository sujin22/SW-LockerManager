import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { LockerDB } from '../server/firebase';
import Locker from './Locker';
import Lockerinfo from './LockerInfo.js';

const LockerContainer = ({area, user_id}) => {
    const [lockerList, setLockerList] = useState([]);

    useEffect(() => {
        console.log("LockerContainer Created!");
        LockerDB().getLockerData(area).then((data) => {
            setLockerList(data);
        })
    }, [area])

    const [ visible, setVisible] = useState(false);
    const [ curLocker, setcurLocker] = useState([]);

    
    const handleOpenInfoModal = () =>{
        setVisible(true);
    }
  
    const handleCloseInfoModal = () =>{        
        setVisible(false);
    }

    //TODO : 사용자 검사
    const isAdmin =()=>{
        return false;
    }

    const openInfoHandler = (locker) => {        
        //사용자일경우 신청
        if(isAdmin()){
            alert("신청하시겠습니까?");
            return;
        }       
        
         //관리자일 경우 정보열람
        if(!visible){
            handleOpenInfoModal();
            setcurLocker(locker);
        }            
    }; 

    //선택된 area에 맞게 col 개수 리턴
    const getLockerCol = (_area) =>{
        if(_area ==='A'||_area ==='B'){
            return 10;
        }else if(_area ==='C'||_area ==='D'||_area ==='E'){
            return 6;
        }
    }

    //lockerlist가 undefined 아니면, area에 따른 col값 가져옴
    const locker_col = (lockerList.length!= 0)? getLockerCol(lockerList[0].area) : 10;
    
    // const findUserLocker = () =>{
        
    //     var i = 0;
    //     while(i<lockerList.length){
    //         if(lockerList[i].user_id === user_id){
                
    //             console.log("현재 id는 "+user_id);
    //             console.log("id는 "+lockerList[i].user_id);
    //             console.log("area는 "+lockerList[i].area);
    //             console.log("number는 "+lockerList[i].number);
    //             return lockerList[i];
    //         }
    //     }
    //     return "일치 항목 없음";
    // }

    return(
        <div className="locker_border"
            style={{width:50*(locker_col+1)}}>
            {
                lockerList.map((locker) => {
                
                return (
                    <Locker key={locker.number} data={locker} handler={() => openInfoHandler(locker)} /> )             
                })                
            }
            <Lockerinfo isOpen={visible} close={handleCloseInfoModal}  data={curLocker}/>
        </div>
    );
}
LockerContainer.propTypes = {
    area: Proptypes.string.isRequired
};

export default LockerContainer;