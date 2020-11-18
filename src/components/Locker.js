import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import './Locker.css';
import { LockerDB } from '../server/firebase';

const Locker = ({ data }) => {
    const { area, number, able, user } = data;

    return(
        <div style={{float: 'left', width: 50, height: 50, margin: 2, color: 'white', backgroundColor: able? "blue" : "red", transition: "background-color 1s"}}>
          {area}<br />{number}
        </div>
    );
}
Locker.propTypes = {
    data: Proptypes.shape({
        area: Proptypes.string.isRequired,
        number: Proptypes.number.isRequired,
        able: Proptypes.bool.isRequired,
        user: Proptypes.string
    })
};

export default Locker;