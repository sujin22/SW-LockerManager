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
const firebase_module = () => {
  
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
      let userData = {};
      await db.collection('user').doc(id).get()
        .then((snapshot) => {
          userData = {
            id: snapshot.id,
            ...snapshot.data()
          };
        })
        .catch((err) => {
          console.log(`Error getting user/${id} document`, err);
        });
      return userData;
    }
  }

  // 유저 데이터 설정하기
  // userData는 Object{id, name, password, phone}
  // onCompleted는 설정 완료 콜백 함수
  const setUserData = (userData, onCompleted = () => console.log(`Data[${userData.id}] updated`)) => {
    if(userData.id === '' || userData.password === '') {
      alert("입력 양식을 확인해주세요");
      return;
    }
    const data = {
      password: userData.password
    }
    db.collection('user').doc(userData.id).set(data)
      .then(onCompleted)
      .catch((err) => {
        console.log(`Error setting user/${userData.id} document`, err);
      })
  }

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

  return { getUserData, setUserData, getLockerData, addLockerData, setLockerData, addLockerDataListener, removeLockerDataListener }
}

export { firebase_module };
