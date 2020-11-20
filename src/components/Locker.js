import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import './Locker.css';
import { LockerDB } from '../server/firebase';
import auth from '../server/auth';

const Locker = ({ data , handler}) => {
    const { area, number, able, user } = data;

    //available (true:white / false:gray)
    if(user===undefined){
        return(
            <div className="locker_item" style={{float: 'left', width: 50, height: 50, margin: 2, color: 'black', backgroundColor: able? "white" : "#D5D5D5",transition: "background-color 1s", border:"1px solid gray"}}
            onClick={handler}>
              {area}<br />{number}
            </div>
        );
    }

    //is it mine? (true:blueviolet / false:blue)
    else{
        return(

            <div className="locker_item" style={{float: 'left', width: 50, height: 50, margin: 2, color: 'black', backgroundColor: user.id === auth().getCurrentUser().id? "blueviolet" : "#D9E5FF", transition: "background-color 1s", border:"1px solid gray"}}
            onClick={handler}>
              {area}<br />{number}
            </div>
        );
    }
    
}
Locker.propTypes = {
    data: Proptypes.shape({
        area: Proptypes.string.isRequired,
        number: Proptypes.number.isRequired,
        able: Proptypes.bool.isRequired,
        user: Proptypes.object
    })
};

export default Locker;