import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { LockerDB } from '../server/firebase';
import Locker from './Locker';
import Lockerinfo from './LockerInfo.js';

// function Locker({id, row, col}){
const LockerContainer = ({ area, col }) => {
    const [lockerList, setLockerList] = useState([]);
    useEffect(() => {
        console.log("LockerContainer Created!");
        LockerDB().getLockerData(area).then((data) => {
            setLockerList(data);
        })
    }, [])

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

    return(
        <div className="locker_border"
            style={{width:50*(col+1)}}>
            {
                lockerList.map((locker) => {
                //console.log(locker)
                //console.log(col)

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