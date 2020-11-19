import { UserDB } from "./firebase.js";

// 인증된 유저 데이터
let userSessionData = {};
// 유저 데이터 설정
const setUserSessionData = (obj) => { userSessionData = obj; } 

// 리스너 객체
const initial_notify = () => { console.log("No callback function for auth update"); }
const listener = {
  notify: initial_notify
};

// 유저 인증(=로그인) 모듈
const auth = () => {
  const localData = sessionStorage.getItem('SWLM_USER_DATA');
  if (localData) {
    setUserSessionData(JSON.parse(localData));
  }
  // 인증된 유저 데이터 반환
  const getCurrentUser = () => {
    return Object.keys(userSessionData).length === 0 ? undefined : userSessionData;
  }

  const isAdmin = () => {
    const user = getCurrentUser();
    if (user) {
      if (user.id === '00000000') { return true; }
      else { return false; }
    } else {
      alert("로그인이 필요합니다!");
      return false;
    }
  }

  // 로그인 상태 확인
  const isLogin = () => {
    return getCurrentUser() ? true : false;
  }

  // 로그인 (success 반환)
  const login = async (id='', password='') => {
    if (id === '' || password === '') { console.log("Input data is empty"); return false; }
    if (isLogin()) { console.log("Alreay login"); return false; }
    const data = await UserDB().getUserData(id);
    if (!data) { alert("회원이 아닙니다! 회원가입을 진행해주세요."); return false; } 
    else {
<<<<<<< HEAD
      if (data.pw !== pw) { alert("비밀번호가 일치하지 않습니다!"); }
      setUser(data);
=======
      if (data.password !== password) { alert("비밀번호가 일치하지 않습니다!"); return false; }
      // delete data.password;
      sessionStorage.setItem('SWLM_USER_DATA', JSON.stringify(data));
      setUserSessionData(data);
>>>>>>> origin/snoopy
      listener.notify();
      return true;
    }
  }
  // 로그아웃
  const logout = () => {
    sessionStorage.removeItem('SWLM_USER_DATA');
    setUserSessionData({});
    listener.notify();
  }

  // 리스너 등록 (실제로는 콜백 함수 등록)
  const addListener = (onChanged) => {
    listener.notify = () => {
      onChanged(getCurrentUser());
    }
  }
  // 리스너 삭제 (실제로는 콜백 함수 삭제)
  const removeListener = () => { listener.notify = initial_notify; }
  
  return { getCurrentUser, isAdmin, isLogin, login, logout, addListener, removeListener }
}

export default auth;