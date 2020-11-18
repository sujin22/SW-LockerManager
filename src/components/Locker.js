import React from 'react';
import Proptypes from 'prop-types';
import './Locker.css';

function Locker({id, row, col}){
    console.log(id +" "+ row+" "+col);


    return(
        <div className="locker_box">
            <p>사물함이 출력될 부분</p>
        </div>
    );
}
Locker.propTypes = {
    id: Proptypes.string,
    low: Proptypes.number.isRequired,
    col: Proptypes.number.isRequired,
};

export default Locker;