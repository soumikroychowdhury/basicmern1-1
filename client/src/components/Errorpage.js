import React from 'react'
import {NavLink} from 'react-router-dom'

const Errorpage = () => {
  return (
    <>
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>This Page Does Not Exist</h2>
                <p className="mb-5">
                    The page you are looking for might have been removed, its name has been changed or is temporarily unavailable.
                </p>
                <NavLink to="/">Go Back To Homepage</NavLink>
            </div>
        </div>
    </>
  )
}

export default Errorpage