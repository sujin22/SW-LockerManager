import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { UserDB, LockerDB } from '../server/firebase';
import Locker from './Locker';
import Lockerinfo from './LockerInfo.js';
import auth from './../server/auth';

const LockerContainer = ({ lockers }) => {
    const [ visible, setVisible] = useState(false);
    const [ curLocker, setcurLocker] = useState({});

    console.log("LockerContainer Render!");

    const handleOpenInfoModal = () =>{
        setVisible(true);
    }
    const handleCloseInfoModal = () =>{        
        setVisible(false);
    }

    const openInfoHandler = (locker) => {        
        //사용자일경우 신청
        if(!auth().isAdmin()){
            //이미 선택된 사물함
            if(locker.user){
                alert("사용중인 사물함입니다!");
                return;

            }
            //선택되지 않은 사물함
            else{
            const isConfirmed = window.confirm(`사물함 ${locker.area}-${locker.number} 신청하시겠습니까?`);
            if (isConfirmed) {
                const user = auth().getCurrentUser();
                const newLockerData = {
                    ...locker,
                    user: {
                        id: user.id,
                        name: user.name,
                        phone: user.phone
                    }
                }
                LockerDB().setLockerData(newLockerData, () => {
                    const newUserData = {
                        ...user,
                        locker: {
                            area: locker.area,
                            number: locker.number
                        }
                    }
                    console.log("newUserData", newUserData);
                    UserDB().setUserData(newUserData, () => {
                        alert("신청이 완료되었습니다!");
                        auth().setUserData(newUserData);
                    })
                })
            }
            return;
            }
            
        }      
        
         //관리자일 경우 정보열람
        if(!visible){
            handleOpenInfoModal();
            setcurLocker(locker);
        }            
    }; 

    //선택된 area에 맞게 col 개수 리턴 (default area = A)
    const getLockerCol = () =>{
        const area = lockers.length > 0 ? lockers[0].area : 'A';
        if(area ==='A'||area ==='B'){
            return 10;
        }else if(area ==='C'||area ==='D'||area ==='E'){
            return 6;
        }
    }
    const locker_col = getLockerCol();

    return(
        <div className="locker_border"
            style={{width:50*(locker_col+1)}}>
            {
                lockers.map((locker) => {
                
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