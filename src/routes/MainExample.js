import React, { useState, useEffect } from 'react';
import { firebase_module } from '../firebase.js'

const MainExample = () => {
  const [ lockerList, setLockerList ] = useState([]);
  useEffect(() => {
    const db = firebase_module();
    const updateLockerData = (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const newLockerData = {
          area: change.doc.ref.path.split('/')[1],
          ...change.doc.data()
        };
        console.log(newLockerData);
        let newLockerList = [];
        const isExist = lockerList.findIndex(locker => locker.number === newLockerData.number) !== -1;
        if (isExist) {
          newLockerList = lockerList.map(locker => (locker.number === newLockerData.number) ? newLockerData : locker);
        } else {
          newLockerList = lockerList;
          newLockerList.push(newLockerData);
          newLockerList.sort((a, b) => a.number - b.number);
        }
        setLockerList(newLockerList);
      })
    }
    db.addLockerDataListener(updateLockerData);
    return () => {
      db.removeLockerDataListener();
    }
  }, [])

  const onSelectLocker = (locker) => {
    if (!locker.able) {
      alert('이미 사용자가 있는 사물함입니다!')
      return;
    }
    const newLocker = {
      ...locker,
      able: false
    }
    firebase_module().setLockerData(newLocker);
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