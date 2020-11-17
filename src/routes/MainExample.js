import React, { useState, useEffect } from 'react';
import { LockerDB } from '../server/firebase.js'
import auth from './../server/auth';

const MainExample = (props) => {
  const [ lockerList, setLockerList ] = useState([]);
  const [ newLocker, setNewLocker ] = useState();

  if (!auth().isLogin()) {
    alert("로그인이 필요합니다!");
    props.history.goBack();
  }

  useEffect(() => {
    LockerDB().getLockerData().then((data) => {
      setLockerList(data);
    })
  }, [])

  useEffect(() => {
    const db = LockerDB();
    let count = 0;
    const updateLockerData = (snapshot) => {
      if (count <= 4) { count += 1; return; }
      snapshot.docChanges().forEach((change) => {
        const newLockerData = {
          area: change.doc.ref.path.split('/')[1],
          ...change.doc.data()
        };
        setNewLocker(newLockerData);
      })
    }
    db.addLockerDataListener(updateLockerData);
    return () => {
      db.removeLockerDataListener();
    }
  }, [])

  useEffect(() => {
    if (newLocker === undefined || Object.keys(newLocker).length === 0) { return; }
    const isExist = lockerList.findIndex(locker => locker.number === newLocker.number) !== -1;
    if (isExist) {
      const newLockerList = lockerList.map(locker => (locker.number === newLocker.number) ? newLocker : locker);
      setLockerList(newLockerList);
    }
  }, [newLocker])

  

  const onSelectLocker = (locker) => {
    if (!locker.able) {
      alert('이미 사용자가 있는 사물함입니다!')
      return;
    }
    const newLocker = {
      ...locker,
      able: false
    }
    LockerDB().setLockerData(newLocker);
  }

  return (
    lockerList.map((locker) => {
      return (
        <div key={locker.number} style={{float: 'left', width: 50, height: 50, margin: 2, color: 'white', backgroundColor: locker.able? "blue" : "red", transition: "background-color 1s"}}
          onClick={() => onSelectLocker(locker)}>
          {locker.area}<br />{locker.number}
        </div>
      )
    })
  )
}

export default MainExample;