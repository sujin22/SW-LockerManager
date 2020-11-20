import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { UserDB, LockerDB } from '../server/firebase';
import Locker from './Locker';
import Lockerinfo from './LockerInfo.js';
import auth from './../server/auth';

const LockerContainer = ({ user, lockers, startLoading, stopLoading}) => {
    const [ visible, setVisible] = useState(false);
    const [ curLocker, setcurLocker] = useState({});

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
            if(!locker.able){
                alert("사용이 불가능한 사물함입니다!");
                return;
            }
            if(locker.user){
                alert("이미 배정된 사물함입니다!");
                return;
            }
            //선택되지 않은 사물함
            else{
                startLoading();
                let isConfirmed;
                if (user.locker) {
                    isConfirmed = window.confirm(`이미 배정받은 사물함이 있습니다!\n사물함 ${locker.area}-${locker.number} 신청하시겠습니까?`);
                } else {
                    isConfirmed = window.confirm(`사물함 ${locker.area}-${locker.number} 신청하시겠습니까?`);
                }
                if (!isConfirmed) { return; }

                LockerDB().initLockerData(user.locker, () => {
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
                            },
                        }
                        UserDB().setUserData(newUserData, () => {
                            setTimeout(() => {
                                alert("신청이 완료되었습니다!");
                                newUserData.id = user.id;
                                auth().setUserData(newUserData);
                                stopLoading();
                            }, 1000);
                        })
                    })
                })
                
                return;
            }
            
        } else {
            
            //관리자일 경우 정보열람
            if(!visible){
                handleOpenInfoModal();
                setcurLocker(locker);
            }       
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
            style={{width:52*(locker_col+1)}}>
            {
                lockers.map((locker) => {
                if(locker.user !== undefined){
                    console.log("여기는 container "+ locker.user.id);
                }
                return (
                    <Locker key={locker.number} data={locker} handler={() => openInfoHandler(locker)} /> )             
                })                
            }
            <Lockerinfo isOpen={visible} close={handleCloseInfoModal} data={curLocker}/>
        </div>
    );
}
LockerContainer.propTypes = {
    area: Proptypes.string.isRequired
};

export default LockerContainer;