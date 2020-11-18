import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { LockerDB } from '../server/firebase';
import Locker from './Locker';
import Modal from './Modal/Modal.js';

// function Locker({id, row, col}){
const LockerContainer = ({ area, col }) => {
    const [lockerList, setLockerList] = useState([]);
    useEffect(() => {
        console.log("LockerContainer Created!");
        LockerDB().getLockerData(area).then((data) => {
            setLockerList(data);
        })
    }, [])

    const [ visible, setVisible] = useState(true);

    const handleOpenInfoModal = () =>{
        setVisible(true);
        console.log("open"+visible);
    }
  
    const handleCloseInfoModal = () =>{        
        setVisible(false);
        console.log("close"+visible);
    }

    //TODO : 사용자 검사
    const isAdmin =()=>{
        return false;
    }

    const openInfoHandler = () => {        
        //사용자일경우 신청
        if(isAdmin()){
            alert("신청하시겠습니까?");
            return;
        }       
        
         //관리자일 경우 정보열람
        console.log("locker"+visible);
        if(!visible){
            handleOpenInfoModal();
            
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
                    <Locker key={locker.number} data={locker} handler={openInfoHandler} />
                )
                
                })                
            }
            <Modal isOpen={visible} close={handleCloseInfoModal} />
        </div>
    );
}
LockerContainer.propTypes = {
    area: Proptypes.string.isRequired
};

export default LockerContainer;