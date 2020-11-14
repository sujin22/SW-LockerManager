import React from 'react';
import './Signup.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class Signup extends React.Component{

    constructor () {
        super();
        this.state = {
          showModal: false,
          id: "",
          password:"",
          name: "",
          phone:""
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
      }
      
      handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }
    
      //값이 변경될 떄마다 값 리턴
      changeID = function() {
        const id_v = document.getElementsByName('id')[0].value;
        console.log(id_v)
        this.setState({
          id : id_v
        });
      }   
          
      render(){
        return(
          <div>        
             <button onClick={this.handleOpenModal}>Login</button>
             <Modal 
               isOpen={this.state.showModal}
               contentLabel="onRequestClose Example"
               onRequestClose={this.handleCloseModal}
               className="Modal"
               overlayClassName="Overlay"
            >
              <div>
                        <h4 className='acenter login_tit'> 관리자 로그인 </h4>
                        <form>
                        <div className='login_div'>
                          <div className='login_input_div'>
                            <p> 관리자 ID </p>
                            <input type='text' name='id' onChange={() => this.changeID()}/>
                          </div>
    
                          <div className='login_input_div' style={{ 'marginTop' : '40px'}}>
                            <p> 관리자 Password </p>
                            <input type='text' name='password'/>
                          </div>
    
                          <div className='submit_div'>
                            <div> <input type='button' value='로그인'/> </div>
                            <div> <button onClick={this.handleCloseModal}>Close Modal</button> </div>
                          </div>
                        </div>
                        </form>
                      </div>
    
    
              
            </Modal>
          </div>
               
          
        );
      }
    }
    export default Signup;