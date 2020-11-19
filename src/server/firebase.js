import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase 설정 (원래 google-service.json에서 가져올라 했는데 왜 안보이지...)
var firebaseConfig = {
  apiKey: "AIzaSyBmrru7Rx7ptlmmtVz4FzKezRZYI1xQNek",
  authDomain: "lockermanager-6bf55.firebaseapp.com",
  databaseURL: "https://lockermanager-6bf55.firebaseio.com",
  projectId: "lockermanager-6bf55",
  storageBucket: "lockermanager-6bf55.appspot.com",
  // messagingSenderId: "sender-id",
  appID: "1:920621336198:web:bb80edc1d6017a329bb307",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// firestore 커스텀 모듈
const UserDB = () => {

  // 유저 데이터 불러오기
  // id 전달 시 해당 유저 한명 데이터 불러오고, 없을 시 전체 유저 불러옴
  const getUserData = async (id='') => {
    if (id === '') {
      let userList = [];
      await db.collection('user').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const item = {
              id: doc.id,
              ...doc.data()
            };
            userList.push(item);
          })
        })
        .catch((err) => {
          console.log('Error getting user documents', err);
        });
      return userList;
    } else {
      let userData = undefined;
      await db.collection('user').doc(id).get()
        .then((snapshot) => {
          if (snapshot.exists) {
            userData = {
              id: snapshot.id,
              ...snapshot.data()
            };
          }
        })
        .catch((err) => {
          console.log(`Error getting user/${id} document`, err);
        });
      return userData;
    }
  }

  // 유저 데이터 설정하기 (id가 new면 추가)
  // userData는 Object{id, name, password, phone}
  // onCompleted는 설정 완료 콜백 함수
  const setUserData = (userData, onCompleted = () => console.log(`Data[${userData.id}] updated`)) => {
    if (userData.id === '' || userData.password === '' || userData.phone === '') {
      alert("입력 양식을 확인해주세요");
      return;
    }
    // if (await getUserData(userData.id))  { console.log("Already exist. It will modified.") }
    const userID = userData.id;
    delete userData.id;
    db.collection('user').doc(userID).set(userData)
      .then(onCompleted)
      .catch((err) => {
        console.log(`Error setting user/${userID} document`, err);
      }, { merge: true })
  }
  // 유저 데이터 초기화하기(락커만 없애기)
  const initUserData = (userID, onCompleted = () => console.log(`Data[${userID}] init`)) => {
    db.collection('user').doc(userID).update({
      locker: firebase.firestore.FieldValue.delete()
    }).then(onCompleted);
  }

  // 유저 데이터 삭제하기
  // userID는 학번(string)
  // onCompleted는 설정 완료 콜백 함수
  const removeUserData = async (userID, onCompleted = () => console.log(`Data[${userID}] removed`)) => {
    if (!(await getUserData(userID)))  { console.log("Already deleted."); return; }
    db.collection('user').doc(userID).delete()
      .then(onCompleted)
      .catch((err) => {
        console.log(`Error removing user/${userID} document`, err);
      })
  }
  

  return { getUserData, setUserData, initUserData, removeUserData }
}


const RegisterDB = () => {

  // 회원가입 데이터 불러오기
  // id 전달 시 해당 회원가입 데이터 불러오고, 없을 시 전체 유저 불러옴
  // onCompleted는 설정 완료 콜백 함수
  const getRegisterData = async (id='') => {
    if (id === '') {
      let registerList = [];
      await db.collection('register').orderBy('datetime').get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              registerList.push(doc.data());
            })
          }
        })
        .catch((err) => {
          console.log(`Error getting register documents`, err);
        })
      return registerList;
    } else {
      let registerData = undefined;
      await db.collection('register').where('id', '==', id).get()
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            registerData = {
              key: snapshot.docs[0].id,
              ...snapshot.docs[0].data()
            }
          }
        })
        .catch((err) => {
          console.log(`Error getting register/${id} document`, err);
        })
      return registerData;
    }
  }

  // 회원가입 데이터 추가하기
  // inputData는 Object{id, name, password, phone}
  // onCompleted는 설정 완료 콜백 함수
  const addRegisterData = async (inputData, onCompleted = () => console.log(`Data[${inputData.id}] added`)) => {
    if (inputData.id === '' || inputData.password === '' || inputData.phone === '') {
      alert("입력 양식을 확인해주세요");
      return;
    }
    const r_data = await getRegisterData(inputData.id);
    if (r_data)  { alert("이미 신청된 학번입니다!"); return; }
    const u_data = await UserDB().getUserData(inputData.id);
    if (u_data) { alert("이미 가입된 학번입니다!"); return; }
    inputData.datetime = firebase.firestore.Timestamp.fromDate(new Date());
    db.collection('register').add(inputData)
      .then(onCompleted)
      .catch((err) => {
        console.log(`Error adding register/${inputData.id} document`, err);
      })
  }

  // 회원가입 데이터 삭제하기
  // userID는 string
  // onCompleted는 설정 완료 콜백 함수
  const removeRegisterData = async (id, onCompleted = () => console.log(`Data[${id}] removed`)) => {
    const data = await getRegisterData(id);
    if (!data)  { alert("이미 삭제된 학번입니다!"); return; }
    db.collection('register').doc(data.key).delete()
      .then(onCompleted)
      .catch((err) => {
        console.log(`Error removing register/${data.key} document`, err);
      })
  }

  return { getRegisterData, addRegisterData, removeRegisterData }
}


const LockerDB = () => {

  // 사물함 데이터 불러오기
  // area 전달 시 해당 구역의 사물함 데이터 불러오고, 없을 시 전체 사물함 불러옴
  const getLockerData = async (area='') => {
    let lockerList = [];
    if (area === '') {
      const promises = ['A', 'B', 'C', 'D', 'E'].map(async (area) => {
        await db.collection(`area/${area}/locker`).orderBy('number').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const item = {
              area,
              ...doc.data()
            };
            lockerList.push(item);
          })
        })
        .catch((err) => {
          console.log(`Error getting area/${area} documents`, err);
        });
      })
      await Promise.all(promises);
    } else {
      await db.collection(`area/${area}/locker`).orderBy('number').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const item = {
              area,
              ...doc.data()
            };
            lockerList.push(item);
          })
        })
        .catch((err) => {
          console.log(`Error getting area/${area} document`, err);
        });
    }
    return lockerList;
  }

  // 사물함 데이터 추가하기
  // lockerData는 Object{area, number, able, user}
  // onCompleted는 설정 완료 콜백 함수
  const addLockerData = (lockerData, onCompleted = () => console.log(`Data[${lockerData.number}] added`)) => {
    const area = lockerData.area
    delete lockerData.area
    db.collection(`area/${area}/locker`).add(lockerData)
      .then(onCompleted)
      .catch((err) => {
        console.log(`Error adding area/${area}/locker/${lockerData.number} document`, err);
      })
  }

  // 사물함 데이터 수정하기
  // lockerData는 Object{area, number, able, user}
  // onCompleted는 설정 완료 콜백 함수
  const setLockerData = (lockerData, onCompleted = () => console.log(`Data[${lockerData.number}] updated`)) => {
    const area = lockerData.area
    delete lockerData.area
    db.collection(`area/${area}/locker`).where('number', '==', lockerData.number).get()
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          if (lockerData.user && snapshot.docs[0].data().locker) {
            alert("이미 배정된 사물함입니다!");
          } else {
            snapshot.docs[0].ref.set(lockerData, {merge: true}).then(onCompleted);
          }
        }
      })
      .catch((err) => {
        console.log(`Error adding area/${area}/locker/${lockerData.number} document`, err);
      })
  }
  // 사물함 데이터 초기화하기(사용자만 없애기)
  const initLockerData = (lockerData, onCompleted = () => console.log(`Data[${lockerData.number}] init`)) => {
    const area = lockerData.area
    delete lockerData.area
    db.collection(`area/${area}/locker`).where('number', '==', lockerData.number).get()
      .then((snapshot) => {
        if(snapshot.docs.length > 0) {
          snapshot.docs[0].ref.update({
            user: firebase.firestore.FieldValue.delete()
          }).then(onCompleted);
        }
      })
  }

  let lockerDataListener = undefined;
  // 사물함 데이터 리스너 등록하기
  const addLockerDataListener = (area, onChanged = (change) => console.log(change.doc.data())) => {
    if (lockerDataListener) {
      console.log('Listener already added!');
      return;
    }
    const listener = db.collection(`area/${area}/locker`).onSnapshot(
      snapshot => {
        snapshot.docChanges().forEach(onChanged);
      },
      err => {
        console.error(err);
      })
    lockerDataListener = listener;
    console.log('Listener added!')
  }
  // 사물함 데이터 리스너 등록 해제하기
  const removeLockerDataListener = () => {
    if (!lockerDataListener) {
      console.log('Listener already empty!');
      return;
    }
    lockerDataListener();
    lockerDataListener = undefined;
    console.log('Listener removed!')
  }

  return { getLockerData, addLockerData, setLockerData, initLockerData, addLockerDataListener, removeLockerDataListener }
}

export default db;
export { UserDB, RegisterDB, LockerDB };
