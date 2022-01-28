import React from "react";
import {Link, useNavigate, Redirect} from 'react-router-dom'
import {useState, useEffect,} from 'react'
import Header from "./Header";

function UserSignUp() {

    const [userInfo, setUserInfo] = useState({})

    const sendUserInfo = async(e) => {
            e.preventDefault(); 
            console.log(userInfo)
       await fetch('http://localhost:5000/api/users', {
            method: 'POST', 
            headers : {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(userInfo)
        })
        .then(res =>  res.json())
        .then(data => console.log(data)) 
        .catch((err) => {
            console.log(err)
        })
        
    }
   



  return (
    
    <div id='root'> 
     <Header /> 
      
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

                <p>Already have a user account? Click here to <Link to="/sign-in">sign in</Link>!</p>
            </div>
        </main>
    </div> 
    
  );
}

export default UserSignUp;