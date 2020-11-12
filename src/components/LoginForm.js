import React from 'react';
import {Component} from 'react';

class LoginForm extends Component{
    state = {
        id: '',
        pw: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.Value
        })
    }

    render(){
        return(
            <div>
                <form>
                    <input
                    name="id"
                    placeholder="학번"
                    value={this.state.id}
                    onChange={this.handleChange}
                    
                    />
                    <input
                    name="pw"
                    placeholder="비밀번호"
                    value={this.state.pw}
                    onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default LoginForm;