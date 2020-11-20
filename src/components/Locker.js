import React from 'react';
import Proptypes from 'prop-types';
import './Locker.css';
import auth from '../server/auth';

const Locker = ({ data , handler}) => {
    const { area, number, able, user } = data;

    //available (true:white / false:gray)
    //로그아웃시 else문 auth실행되지않도록 예외처리
    if(!auth().isLogin() || user===undefined){
        return(
            <div className="locker_item" 
                style={{float: 'left', width: 50, height: 50, margin: 2,
                        color: 'black', backgroundColor: able? "white" : "#D5D5D5",
                        transition: "background-color 1s", border:"1px solid gray"}}
                onClick={handler}
            >
              {area}<br />{number}
            </div>
        );
    }

    //is it mine? (true:blueviolet / false:blue)
    else{
        console.log("현재 사용자 id: "+ auth().getCurrentUser().id);
        console.log("이 사물함 사용자 id: "+ user.id + " "+ area + number);

        return(
            <div className="locker_item" 
                style={{float: 'left', width: 50, height: 50, margin: 2, 
                        color: user.id === auth().getCurrentUser().id? 'white' : 'black', 
                        backgroundColor: (user.id === auth().getCurrentUser().id)? "#002266" : "#D9E5FF", 
                        transition: "background-color 1s", border:"1px solid gray"}}
                onClick={handler}
            >
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