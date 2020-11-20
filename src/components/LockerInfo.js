import React, { useState, useEffect } from 'react';
import './Modal/Modal.scss';
import Proptypes from 'prop-types';
import './LockerInfo.scss'
import { LockerDB, UserDB } from '../server/firebase';



const Lockerinfo = ({ isOpen, close, data }) => {  
    const { area, number, able, user } = data;
    const [edit ,setEdit ] = useState(false);
    useEffect(() => {
      console.log('edit changed!')
      {setnewAble(able)}
      if(user)
        setnewUserId(user.id);
      else
      setnewUserId(null);   
    }, [edit])

    useEffect(() => {
      console.log('number changed!')
      {setnewAble(able)}
      if(user)
        setnewUserId(user.id);
      else
      setnewUserId(null);      
    }, [number])



    //수정된 사물함 정보
    const [ newUserId,setnewUserId ] = useState({});
    useEffect(() => {
    }, [newUserId])
    const [ newAble,setnewAble] = useState(able); 
    useEffect(() => {
    }, [newAble])   

    //삭제버튼 클릭시
    const deleteHandler =()=>{
      const isConfirmed = window.confirm("삭제하시겠습니까?"); 
      if (isConfirmed) {
        LockerDB().initLockerData({area, number}, () => {
          UserDB().initUserData(user.id, () => {
            alert('삭제되었습니다.');
            close();
          })
        })
      }
    }

    //수정버튼 클릭시
    const editHandler =()=>{
        setEdit(true);
    }

  const checkboxHandler =(e)=>{  
      setnewAble(e.target.checked);   
  }

  const infoEditNumHandler = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    setnewUserId(newValue);
  }
  const sumitHandler =()=>{
    //새로운 정보 전송
    if(edit && able!=newAble){
      LockerDB().enableLockerData({area, number}, newAble, () => {        
      })
    }    
    setEdit(false);
    close();
}

  const renderSubmitBtn = () => {
        return (<div><button onClick={sumitHandler}>확인</button></div>);
  }

  return (
    <React.Fragment>
    {
      isOpen ?
      <React.Fragment>
        <div className="Modal-clearoverlay"  />
        <div className="Modal">
          <p className="title">{number}</p>
          <div className="mContent">
              {edit ?
              <React.Fragment>                               
                                
               <div className = "wraplabel">
               <input
                        name="newAble"
                        className="ableCb"
                        type="checkbox"
                        value={newAble}
                        checked={newAble} 
                        label="사용 가능 유무"
                        onChange={checkboxHandler}                       
                    ></input>
                    <text  className="ableCb">  사물함 사용 가능</text>
               </div>     
              </React.Fragment>
              :
              <React.Fragment>
                <p>학번 : {user?user.id:""}</p>
                <p>이름 : {user?user.name:""}</p>
                <p>연락처 : {user?user.phone:""}</p>
                <div className="twobutton-wrap">
                {!user && <button onClick={editHandler}>사물함 정보 수정</button> } 
                  { user && <button onClick={deleteHandler}>사용자 삭제</button> }
                </div>              
              </React.Fragment>
              }
          </div>          
          
          <div className="button-wrap">    
          {renderSubmitBtn()}
          </div>
        </div>
      </React.Fragment>: null
    }
    </React.Fragment>
  )
}
Lockerinfo.propTypes = {
    data: Proptypes.shape({
        area: Proptypes.string.isRequired,
        number: Proptypes.number.isRequired,
        able: Proptypes.bool.isRequired,
        user: Proptypes.shape({
          id: Proptypes.number,
          name: Proptypes.string,
          phone: Proptypes.number
      })
    })
};
export default Lockerinfo;