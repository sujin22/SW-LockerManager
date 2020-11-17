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
          if (!snapshot.exists()) {
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
  const setUserData = async (userData, onCompleted = () => console.log(`Data[${userData.id}] updated`)) => {
    if (userData.id === '' || userData.password === '' || userData.phone === '') {
      alert("입력 양식을 확인해주세요");
      return;
    }
    if (await getUserData(userData.id))  { console.log("Already exist. It will modified.") }
    const userID = userData.id;
    delete userData.id;
    db.collection('user').doc(userID).set(userData)
      .then(onCompleted)
      .catch((err) => {
        console.log(`Error setting user/${userID} document`, err);
      })
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
  

  return { getUserData, setUserData, removeUserData }
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
    db.collection('user').doc(data.key).delete()
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
            // TODO: 데이터베이스 구조 짜고 그에 맞춰 리스트에 추가
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
            // TODO: 데이터베이스 구조 짜고 그에 맞춰 리스트에 추가
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
          snapshot.docs[0].ref.set(lockerData, {merge: true}).then(onCompleted)
        }
      })
      .catch((err) => {
        console.log(`Error adding area/${area}/locker/${lockerData.number} document`, err);
      })
  }

  let lockerDataListener = {};
  // 사물함 데이터 리스너 등록하기
  const addLockerDataListener = (onChange = (snapshot) => snapshot.docChanges().forEach((change) => console.log(change.doc.data()))) => {
    if (Object.keys(lockerDataListener).length !== 0) {
      console.log('Listeners already added!');
      return;
    }
    const listener_A = db.collection('area/A/locker').onSnapshot(onChange, (err) => {
      console.error(err);
    })
    const listener_B = db.collection('area/B/locker').onSnapshot(onChange, (err) => {
      console.error(err);
    })
    const listener_C = db.collection('area/C/locker').onSnapshot(onChange, (err) => {
      console.error(err);
    })
    const listener_D = db.collection('area/D/locker').onSnapshot(onChange, (err) => {
      console.error(err);
    })
    const listener_E = db.collection('area/E/locker').onSnapshot(onChange, (err) => {
      console.error(err);
    })
    lockerDataListener = { listener_A, listener_B, listener_C, listener_D, listener_E }
    console.log('Listener added!')
  }
  // 사물함 데이터 리스너 등록 해제하기
  const removeLockerDataListener = () => {
    if (Object.keys(lockerDataListener).length === 0) {
      console.log('Listeners already empty!')
    }
    lockerDataListener.listener_A();
    lockerDataListener.listener_B();
    lockerDataListener.listener_C();
    lockerDataListener.listener_D();
    lockerDataListener.listener_E();
    lockerDataListener = {};
    console.log('Listeners removed!')
  }

  return { getLockerData, addLockerData, setLockerData, addLockerDataListener, removeLockerDataListener }
}

export default db;
export { UserDB, RegisterDB, LockerDB };
