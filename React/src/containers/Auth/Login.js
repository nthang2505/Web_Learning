import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errMessage: ''
        }
    }

    handleOnChangeEmail = (event)=>{
        this.setState({
            email: event.target.value,
        })
        console.log(event.target.value)
    }
    handleOnChangePassword = (event)=>{
        this.setState({
            password: event.target.value,
        })
        console.log(event.target.value)
    }
    handleLogin = async() =>{
        // this.setState({
        //     errMessage: ''
        // })
        try {
            let data = await handleLoginApi(this.state.email, this.state.password)
            console.log(data)
            if(data && data.errCode !== 0 ){
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            console.log(error)
            this.setState({
                errMessage: error.response.data.message
            })
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content' row>
                        <div className='col-12 text-center'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Email</label>
                            <input type='text' 
                                className='form-control' 
                                placeholder='Enter your email' 
                                value={this.state.email}
                                onChange={(event)=>this.handleOnChangeEmail(event)}
                            ></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <input type='password' 
                                className='form-control' 
                                placeholder='Enter your password'
                                value={this.state.password} 
                                onChange={(event)=>this.handleOnChangePassword(event)}    
                            ></input>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login' onClick={()=>{this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo)=>dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
