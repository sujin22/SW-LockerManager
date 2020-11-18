import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { LockerDB } from '../server/firebase';
import Locker from './Locker';

// function Locker({id, row, col}){
const LockerContainer = ({ area }) => {
    const [lockerList, setLockerList] = useState([]);

    useEffect(() => {
        console.log("LockerContainer Created!");
        LockerDB().getLockerData(area).then((data) => {
            setLockerList(data);
        })
    }, [])

    return(
        <div className="locker_box">
            <p>사물함이 출력될 부분</p>
            {
                lockerList.map((locker) => {
                  console.log(locker)
                  return (
                    <Locker key={locker.number} data={locker} />
                  )
                })
            }
        </div>
    );
}
LockerContainer.propTypes = {
    area: Proptypes.string.isRequired
};

export default LockerContainer;