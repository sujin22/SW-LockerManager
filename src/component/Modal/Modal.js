import React from 'react';
import Signup from '../Signup';
import './Modal.scss';
import '../Signup.css';
//npm install node-sass@4.14.1


const Modal = ({ isOpen, close }) => {  
  return (
    <React.Fragment>
    {
      isOpen ?
      <React.Fragment>
        <div className="Modal-overlay" onClick={close} />
        <div className="Modal">
          <p className="title">회원 가입</p>
          <div className="content">
          <Signup closeHandler={close} />
          </div>          
          <div className="button-wrap">    
          <button onClick={close}>Confirm</button>        
          </div>
        </div>
      </React.Fragment>: null
    }
    </React.Fragment>
  )
}
export default Modal;