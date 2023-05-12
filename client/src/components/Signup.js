import React, {useState} from 'react'
import regpic from '../images/registrationimage.jpg'
import {NavLink, useNavigate} from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:"",email:"",phone:"",work:"",password:"",cpassword:""
    });
    let name,value;
    const manageInputs = (e) => {
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
    }
    const sendData = async (e) => {
        e.preventDefault();
        const {name,email,phone,work,password,cpassword} = user;
        const res = await fetch("/register",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,email,phone,work,password,cpassword
            })
        });
        const data = await res.json();
        if (data.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else{
            window.alert("Registration Successful");
            console.log("Registration Successful");
            navigate("/login");
        }
    }
  return (
    <>
        <section className="signup">
            <div className="container mt-5">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign Up</h2>
                        <form method="POST" className="registration-form" id="registration-form">
                            <div className="form-group">
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-account"></i>
                                    <input type="text" name="name" id="name" className="name" autoComplete="off" value={user.name} onChange={manageInputs} placeholder ="Your Name"/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email"></i>
                                    <input type="email" name="email" id="email" className="email" autoComplete="off" value={user.email} onChange={manageInputs} placeholder ="Your Email"/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">
                                    <i className="zmdi zmdi-phone-in-talk"></i>
                                    <input type="number" name="phone" id="phone" className="phone" autoComplete="off" value={user.phone} onChange={manageInputs} placeholder ="Your Number"/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="work">
                                    <i className="zmdi zmdi-slideshow"></i>
                                    <input type="text" name="work" id="work" className="work" autoComplete="off" value={user.work} onChange={manageInputs} placeholder ="Your Profession"/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-lock"></i>
                                    <input type="password" name="password" id="password" className="password" autoComplete="off" value={user.password} onChange={manageInputs} placeholder ="Your Password"/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword">
                                    <i className="zmdi zmdi-lock"></i>
                                    <input type="password" name="cpassword" id="cpassword" className="cpassword" autoComplete="off" value={user.cpassword} onChange={manageInputs} placeholder ="Confirm Your Password"/>
                                </label>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={sendData}/>
                            </div>
                        </form>
                    </div>
                        <div className="signup-image">
                            <figure>
                                <img src={regpic} alt="Registration Pic" />
                            </figure>
                            <NavLink to="/login" className="signup-image-link">I am already registered</NavLink>
                        </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Signup