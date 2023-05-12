import React, {useEffect, useState} from 'react'

const Home = () => {
  const [userName,setUserName] = useState('');
  const [show,setShow] = useState(false);
  const checkHome = async() => {
    try{
      const res = await fetch('/getdata',{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      // console.log(data);
      setUserName(data.name);
      setShow(true);
    }catch(err){
      console.log(err);
    }
    }
  useEffect(() => {
    checkHome();
  },[]);
  return (
    <>
        <div className="home-page">
          <div className="home-div">
            <p className="pt-5">Welcome {userName}</p>
            <h1>{show?"Happy to see you":"This is our website"}</h1>
          </div>
        </div>
    </>
  )
}

export default Home