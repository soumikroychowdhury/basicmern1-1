import React from 'react'
import {useNavigate} from 'react-router-dom'

const Loginform = ({email,setEmail,password,setPassword,dispatch}) => {
    const navigate = useNavigate();
    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch('/signin',{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,password
            })
        });
        const data = await res.json();
        if(res.status === 400 || !data){
            window.alert("Invalid Credentials");
            console.log("Invalid Credentials");
        }else{
            dispatch({type:"USER",payload:1});
            window.alert("Login Successful");
            console.log("Login Successful");
        }
        navigate("/");
    }
  return (
    <>
        <form method="POST" className="registration-form" id="registration-form">
            <div className="form-group">
                <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                    <input type="email" name="email" id="email" className="email" autoComplete="off" value={email} onChange={(e)=>{
                        setEmail(e.target.value);
                    }} placeholder ="Your Email"/>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i>
                    <input type="password" name="password" id="password" className="password" autoComplete="off" value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }} placeholder ="Your Password"/>
                </label>
            </div>
            <div className="form-group form-button">
                <input type="submit" name="signin" id="signin" className="form-submit" value="Sign In" onClick={loginUser}/>
            </div>
        </form>
    </>
  )
}

export default Loginform