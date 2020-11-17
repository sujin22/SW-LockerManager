import { UserDB } from "./firebase.js";

// 인증된 유저 데이터
let userData = {};

// 리스너 객체
const initial_notify = () => { console.log("No callback function for auth update"); }
const listener = {
  notify: initial_notify
};

// 유저 인증(=로그인) 모듈
const auth = () => {
  
  // 인증된 유저 데이터 반환
  const getCurrentUser = () => {
    return Object.keys(userData).length === 0 ? undefined : userData;
  }
  // 유저 객체 설정
  const setUser = (obj) => { userData = obj; } 

  // 로그인 상태 확인
  const isLogin = () => {
    return getCurrentUser() ? true : false;
  }

  // 로그인
  const login = async (id='', pw='') => {
    if (id === '' || pw === '') { console.log("Input data is empty"); return; }
    if (isLogin()) { console.log("Alreay login"); return; }
    const data = await UserDB().getUserData(id);
    if (!data) { alert("회원이 아닙니다! 회원가입을 진행해주세요."); return; } 
    else {
      if (data.pw !== pw) { alert("비밀번호가 일치하지 않습니다!"); return; }
      setUser(data);
      listener.notify();
    }
  }
  // 로그아웃
  const logout = () => {
    setUser({});
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
  
  return { isLogin, login, logout, addListener, removeListener }
}

export default auth;