import React from 'react';
import './Modal/Modal.scss';
import Proptypes from 'prop-types';




const Lockerinfo = ({ isOpen, close, data }) => {  
    const { area, number, able, user } = data;
    console.log(able);
  return (
    <React.Fragment>
    {
      isOpen ?
      <React.Fragment>
        <div className="Modal-overlay" onClick={close} />
        <div className="Modal">
          <p className="title">{number}</p>
          <div className="mContent">
            <p>학번 : 1111111111{able}</p>
            <p>이름 : {able}</p>
            <p>학년 : {able}</p>     
          </div>          
          <div className="button-wrap">    
          <button onClick={close}>확인</button>        
          </div>
        </div>
      </React.Fragment>: null
    }
    </React.Fragment>
  )
}
Lockerinfo.propTypes = {
    data: Proptypes.shape({
        area: Proptypes.string,
        number: Proptypes.number,
        able: Proptypes.bool,
        user: Proptypes.string
    })
};
export default Lockerinfo;