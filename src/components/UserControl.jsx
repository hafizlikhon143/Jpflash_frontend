import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withParams from './withParams';
import gIcon from '../img/icons/google.png';
import fIcon from '../img/icons/facebook.png';
import '../css/user-control.css';
class UserControl extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    validatePassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        if (hasUpperCase && hasSpecialChar) {
            return true;
        } else {
            return false;
        }
    }
    checkPassMatch = (e)=>{
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        if(password === confirmPassword && password.length > 7 && this.validatePassword(password)){
            document.querySelector(".login-btn").disabled = false;
        }else{
            document.querySelector(".login-btn").disabled = true;
        }
    }
    render() {
        if(this.props.params.controlType === "login"){
            return <>
            <div className="adv_quote">
                <span className='p-1'>Learn something</span> <br /> &emsp;&emsp;&emsp;&emsp; <span className='p-1'>new every day.</span>
            </div>
                <div className="login" id="user-control">
                    <div className="side_container d-grid">
                        <div className="container">
                            <form action="" className="user_form">
                                <div className="control-type-btns">
                                    <div className="control-type-btn control-btn-active">Login</div>
                                    <Link to={"/user/register"} className="control-type-btn">Sign up</Link>
                                </div>
                                <div className="all-auth-form">
                                    <button className="all-auth-btn btn btn-outline-light">
                                        <img src={gIcon} alt="Google Icon" className='all-auth-btn-img' width={"30px"}/>
                                        &nbsp; Log in with Google
                                    </button>
                                    <button className="all-auth-btn btn btn-outline-light">
                                        <img src={fIcon} alt="Facebook Icon" className='all-auth-btn-img' width={"30px"} />
                                        &nbsp; Log in with Facebook
                                    </button>
                                </div>
                            </form>
                            <div className='divider-cont d-flex w-100 justify-content-center align-items-center'>
                                <div className="divider"></div>
                                <div className="divider-text">or email</div>
                                <div className="divider"></div>
                            </div>
                            <form action="" className="user_form">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <div className="labels">
                                    <label htmlFor="password">Password</label>
                                    <div className="forgot-password">Forgot password?</div>
                                    </div>
                                    <input type="password" name="password" id="password" className="form-control" placeholder="Password"/>
                                </div>
                                <button className="btn btn-outline-light login-btn">Login</button>
                                <Link to={"/user/register"} className='btn btn-outline-light back-to-login'>If you dont have an Account</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </>;
        }else if(this.props.params.controlType === "register"){
            return <>
                    <div className="adv_quote">
                        <span className='p-1'>Learn something</span> <br /> &emsp;&emsp;&emsp;&emsp; <span className='p-1'>new every day.</span>
                    </div>
                    <div className="register" id="user-control">
                    <div className="side_container d-grid">
                        <div className="container">
                            <form action="" className="user_form">
                                <div className="control-type-btns">
                                    <Link to={"/user/login"} className="control-type-btn">Login</Link>
                                    <div className="control-type-btn control-btn-active">Sign up</div>
                                </div>
                                <div className="all-auth-form">
                                    <button className="all-auth-btn btn btn-outline-light">
                                        <img src={gIcon} alt="Google Icon" className='all-auth-btn-img' width={"30px"}/>
                                        &nbsp; Start with Google
                                    </button>
                                    <button className="all-auth-btn btn btn-outline-light">
                                        <img src={fIcon} alt="Facebook Icon" className='all-auth-btn-img' width={"30px"} />
                                        &nbsp; Start with Facebook
                                    </button>
                                </div>
                            </form>
                            <div className='divider-cont d-flex w-100 justify-content-center align-items-center'>
                                <div className="divider"></div>
                                <div className="divider-text">or email</div>
                                <div className="divider"></div>
                            </div>
                            <form action="" className="user_form">
                                <div className="form-group">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input type="date" name="dob" id="dob" className="form-control" placeholder="Date of Birth"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" className="form-control" placeholder="Username"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <div className="labels">
                                    <label htmlFor="password">Password</label>
                                    </div>
                                    <input onChange={this.checkPassMatch} type="password" name="password" id="password" className="form-control" placeholder="Password"/>
                                </div>
                                <div className="form-group">
                                    <div className="labels">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    </div>
                                    <input onChange={this.checkPassMatch} type="password" name="confirm-password" id="confirm-password" className="form-control" placeholder="Password"/>
                                </div>
                                <button type='submit' className="btn btn-outline-light login-btn" disabled>Register</button>
                                <Link to={"/user/login"} className='btn btn-outline-light back-to-login'>If you already have one Click here</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </>;
        }else{
            return <>
                <h1>404</h1>
            </>;
        }
    }
}

export default withParams(UserControl);