import React, {useEffect, useState} from 'react'
import defaultpic from '../images/defaultpic.png'
import {useNavigate} from 'react-router-dom'

const About = () => {
  const navigate = useNavigate();
  const [userData,setUserData] = useState({});
  const callAboutPage = async() => {
    try{
      const res = await fetch('/about',{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    }catch(err){
      console.log(err);
      navigate("/login");
    }
  }
  useEffect(() => {
    callAboutPage();
  }, [])
  
  return (
    <>
        <div className="container emp-profile">
          <form action="" method="">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                <img src={defaultpic} alt="defaultpic" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>{userData.name}</h5>
                  <h6>{userData.work}</h6>
                  <p className="profile-rating mt-3 mb-5">RATING: <span>5</span></p>
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" aria-current="page" href="#home" role="tab">Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab">Timeline</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <p>WORK LINK</p>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer">Youtube</a><br />
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><br />
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><br />
                  <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">Twitter</a><br />
                  <a href="https://www.youtube.com" target="_blank" rel="noreferrer">Website</a><br />
                  <a href="/#" target="_blank" rel="noreferrer">Company</a><br />
                  <a href="/#" target="_blank" rel="noreferrer">Estate</a><br />
                </div>
              </div>
              <div className="col-md-8 pl-5 about-info">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email Id</label>
                      </div>
                      <div className="col-md-6">
                        <label>{userData.email}</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <label>{userData.name}</label>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="">Work</label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">{userData.work}</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label htmlFor="">Phone</label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">{userData.phone}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
    </>
  )
}

export default About