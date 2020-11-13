import React from 'react';
import './Signup.css';


class Signup extends React.Component{

    constructor () {
        super();
        this.state = {
          id: "",
          password:"",
          name: "",
          phone:""
        };
        
        
      }     
    
      //값이 변경될 떄마다 값 리턴
      loginHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };  
          
      render(){
        const { id, password ,name,phone } = this.state;
        return(
          <div>               
           <div>           
           <input
                    name="id"
                    className="SignupId"
                    type="text"
                    placeholder="학번"
                    value={id}
                    onChange={this.loginHandler}
                  />
                    <input
                    name="password"
                    className="SignupPw"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={this.loginHandler}
                  />          

                     <input
                    name="name"
                    className="SignupId"
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={this.loginHandler}
                  /> 
                   <input
                    name="phone"
                    className="SignupId"
                    type="tel" 
                    pattern="(010)-[0-9]{4}-[0-9]{4}"
                    placeholder="전화번호"
                    value={phone}
                    onChange={this.loginHandler}
                  />   
                        
            </div>     
          </div>
               
          
        );
      }
    }
    export default Signup;