import React, { useState, useEffect } from 'react';
import { firebase_module } from '../firebase.js'

const MainExample = () => {
  const [ lockerList, setLockerList ] = useState([]);
  const [ newLocker, setNewLocker ] = useState();
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    firebase_module().getLockerData().then((data) => {
      setLockerList(data);
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    const db = firebase_module();
    const updateLockerData = (snapshot) => {
      if (loading) { return; }
      snapshot.docChanges().forEach((change) => {
        const newLockerData = {
          area: change.doc.ref.path.split('/')[1],
          ...change.doc.data()
        };
        console.log(newLockerData);
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
      console.log(newLocker);
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