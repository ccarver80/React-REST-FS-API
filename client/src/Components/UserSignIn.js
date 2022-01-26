import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect,} from 'react'

function UserSignIn() {

    const [userInfo, setUserInfo] = useState({
        "firstName": '', 
        "lastName": '',
        'emailAddress': '', 
        'password': '', 
    })

    const sendUserInfo = (e) => {
            e.preventDefault(); 
            console.log(userInfo)
        fetch('http://localhost:5000/api/users', {
            method: 'POST', 
            headers : {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(userInfo)
        })
        .then((res) => res.json())
        .then(data => {
            console.log('SENT SUCCCESS!', data)
        })
        .catch((err) => {
            console.log(err)
        })
        
    }
   



  return (
    
    <div id='root'> 
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="sign-in.html">Sign In</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form onSubmit={sendUserInfo}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value={userInfo.firstName} onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}  required/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value={userInfo.lastName} onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={userInfo.emailAddress} onChange={(e) => setUserInfo({...userInfo, emailAddress: e.target.value})} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={userInfo.password} onChange={(e) => setUserInfo({...userInfo, password: e.target.value})} />
                    <button className="button" type="submit">Sign Up</button><Link to="/"><button className="button button-secondary">Cancel</button></Link>
                </form>

                <p>Already have a user account? Click here to <Link to="sign-in.html">sign in</Link>!</p>
            </div>
        </main>
    </div> 
    
  );
}

export default UserSignIn;
