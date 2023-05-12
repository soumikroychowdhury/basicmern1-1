import React, {useState, useContext} from 'react'
import regpic from '../images/registrationimage.jpg'
import {NavLink} from 'react-router-dom'
import Loginform from './Loginform'
import {UserContext} from '../App'

const Signin = () => {
  const {state,dispatch} = useContext(UserContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  return (
    <>
      <section className="signin">
            <div className="container mt-5">
                <div className="signin-content">
                    <div className="signin-form">
                    <div className="signin-image">
                            <figure>
                                <img src={regpic} alt="Registration Pic" />
                            </figure>
                            <NavLink to="/signup" className="signin-image-link">Register Here</NavLink>
                        </div>
                        <h2 className="form-title">Sign In</h2>
                        <Loginform email={email} setEmail={setEmail} password={password} setPassword={setPassword} dispatch={dispatch}/>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Signin