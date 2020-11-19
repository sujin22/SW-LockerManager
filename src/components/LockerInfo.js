import React, { useState, useEffect } from 'react';
import './Modal/Modal.scss';
import Proptypes from 'prop-types';
import './LockerInfo.css'



const Lockerinfo = ({ isOpen, close, data }) => {  
    const { area, number, able, user } = data;
    const [edit ,setEdit ] = useState(false);
    useEffect(() => {
      console.log('edit changed!')
    }, [edit])

    useEffect(() => {
      console.log('number changed!')
      {setnewAble(able)}
      {setnewUser(user)}
    }, [number])



    //수정된 사물함 정보
    const [ newUser,setnewUser ] = useState(user);
    useEffect(() => {
      console.log('newUser changed!')
    }, [newUser])
    const [ newAble,setnewAble] = useState(able); 
    useEffect(() => {
      console.log('newAble changed!')
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
    setnewUser(newValue);
  }
  const sumitHandler =()=>{
    setEdit(false);
    close();
}

  const renderSubmitBtn = () => {
    /*
    if(edit ){
      if(typeof newUser=='undefined')
        return (<div><button disabled>확인</button></div>);
      else if (newUser.length<1)
        return (<div><button disabled>확인</button></div>);        
    }*/     

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
                <div>
                  <p>사용자 추가</p>
                <input
                        name="newUser"
                        className="idText"
                        type="text"
                        placeholder="사용자 학번"
                        value={newUser}   
                        onChange={infoEditNumHandler}                        
                    />
                </div>
                 < div>
                 <input
                        name="newAble"
                        className="ableCb"
                        type="checkbox"
                        value={newAble}
                        checked={newAble} 
                        label="사용 가능 유무"
                        onChange={checkboxHandelr}                       
                    />
                    <label htmlFor={newAble}>Label</label>
                 </div>
                     
              </React.Fragment>
              :
              <React.Fragment>
                <p>학번 : {able}</p>
                <p>이름 : {able}</p>
                <p>학년 : {able}</p>
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
        area: Proptypes.string,
        number: Proptypes.number,
        able: Proptypes.bool,
        user: Proptypes.string
    })
};
export default Lockerinfo;