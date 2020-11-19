import React, { useState, useEffect } from 'react';
import './Modal/Modal.scss';
import Proptypes from 'prop-types';
import './LockerInfo.scss'



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
        alert("삭제하시겠습니까?");  
    }

    //수정버튼 클릭시
    const editHandler =()=>{
        setEdit(true);
    }

    const checkboxHandelr =(e)=>{
      console.log(e.target.checked);
      setnewAble(e.target.checked);
  }

  const infoEditNumHandler = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    setnewUserId(newValue);
  }
  const sumitHandler =()=>{

    //새로운 정보 전송
    if(edit){
      //유저 바뀔시 등록 1.유저가 없는데 입력값이 생긴경우 2. 유저값이 있고 바뀐경우
      if(!user && newUserId){
        if(newUserId.length>1){
        }
      }else if( newUserId ){
        if(user.id != newUserId){          
        }
      }
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
                  <div className="wrapuser">
                  <text  className="infoText"> 현재사용자</text>
                  <input
                        name="newUser"
                        className="idText"
                        type="text"
                        placeholder="사용자 학번"
                        value={newUserId}   
                        onChange={infoEditNumHandler}                        
                    />
                  </div>                
               <div className = "wraplabel">
               <input
                        name="newAble"
                        className="ableCb"
                        type="checkbox"
                        value={newAble}
                        checked={newAble} 
                        label="사용 가능 유무"
                        onChange={checkboxHandelr}                       
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
                  <button onClick={editHandler}>사물함 정보 수정</button> 
                  <button onClick={deleteHandler}>사용자 삭제</button> 
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