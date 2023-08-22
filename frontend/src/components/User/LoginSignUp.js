import React, { useRef } from 'react'
import { Fragment } from 'react'
import './LoginSignUp.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileImg from "../../images/profileImg.png"
import Loader from "../layout/Loader/Loader"
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';

const LoginSignUp = ({history}) => {

    const dispatch = useDispatch();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const alert = useAlert();

    // fetching above values from user
    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("./Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("./Profile.png");

    const { error, loading, isAuthenticated } = useSelector((state) => state.user)

    // in react we cant acces dom elemts we have to use useRef eg. cant do document.queryselector("h1")
    // hence we use useRef to give and use a reference
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    useEffect(() => {
      
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated === true )
        {
            history.push("/account")
            // console.log("authenticated")
        }
    
    }, [dispatch, error, alert, isAuthenticated, history]);
    

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        // console.log("login form submitted");
        dispatch(login(loginEmail, loginPassword));

    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        // myForm.set("avatar",avatar);
        // console.log("register form submitted");
        // bel register if from action
        dispatch(register(myForm));
    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar" )
        {
            const reader = new FileReader();

            reader.onload = () => {
              if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
              }
            };
      
            reader.readAsDataURL(e.target.files[0]);
        }
        else
        {
            // below sets name is to value pair of user
            setUser( {...user, [e.target.name]: e.target.value} )
        }
        // console.log("sign up form submitted");
    }


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className="LoginSignUpContainer">

                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signUp_toggle">
                                <p onClick={(e) => { switchTabs(e, "login") }} >LOGIN</p>
                                <p onClick={(e) => { switchTabs(e, "register") }} >REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>

                        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    required
                                    value={loginEmail}
                                    placeholder="Email"
                                    onChange={(e) => { setLoginEmail(e.target.value) }}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    required
                                    value={loginPassword}
                                    placeholder="Password"
                                    onChange={(e) => { setLoginPassword(e.target.value) }}
                                />
                            </div>
                            <Link to="/password/forget">Forget Password</Link>
                            <button type="submit" value="login" className="loginBtn">Login</button>
                        </form>

                        <form className="signUpForm" ref={registerTab} onSubmit={registerSubmit}
                            // we have encryption type whcih is given below for user image upload
                            encType="multipart/form-data"
                        >

                            <div className="signUpName">
                                <FaceIcon />
                                <input type="text" required placeholder="Name" name="name" value={name} onChange={registerDataChange} />
                            </div>

                            <div className="signUpEmail">
                                <MailOutlineIcon />
                                <input type="email" required placeholder="Email" name="email" value={email} onChange={registerDataChange} />
                            </div>

                            <div className="signUpPassword">
                                <input type="password" required placeholder="Password" name="password" value={password} onChange={registerDataChange} />    
                            </div>    

                            <div id="registerImage">
                                <img src={profileImg} alt="Avatar Preview" />
                                <input type="file" name="avatar" accept="image/*" />
                            </div>     

                            <button type="submit" value="Register" className="signUpBtn" >Register</button>               
                        </form>
                    </div>

                </div>
            ) }
        </Fragment>
    )
}

export default LoginSignUp