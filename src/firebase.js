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
  // collection 확인
  const getUserData = async (id='') => {
    if (id == '') {
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

  // const setUser

  return { getUserData }
}

export { firebase_module };
