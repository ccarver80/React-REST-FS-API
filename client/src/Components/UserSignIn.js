import React, { useState } from "react";
import Header from "./Header";
import {Link} from 'react-router-dom'


function UserSignIn() {

    const [userLoginInfo, setUserInfo] = useState({})


        // Build in auth. to check user signin info
        const sendUserInfo = async(e) => {
            e.preventDefault(); 
            const encodedCreds = btoa(`${userLoginInfo.emailAddress}:${userLoginInfo.password}`)
       await fetch('http://localhost:5000/api/users', {
            method: 'GET', 
            headers : {
                'Content-Type': 'application/json', 
                'Authorization': `Basic ${encodedCreds}`
            }, 

        })
        .then(res => {
            if(res.ok){
                const json = res.json(); 
                console.log(json)
            }else {
                const json = res.json(); 
                console.log(json)
            }
        })
        
         
        .catch((err) => {
            console.log(err)
        })
        
    }
   

    return(
        <body>
        <Header />
        <main>
            <div class="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={sendUserInfo}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email"  value={userLoginInfo.emailAddress} onChange={(e) => setUserInfo({...userLoginInfo, emailAddress: e.target.value})} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={userLoginInfo.password} onChange={(e) => setUserInfo({...userLoginInfo, password: e.target.value})} />
                    <button className="button" type="submit">Sign In</button><Link to="/"><button class="button button-secondary">Cancel</button></Link>
                </form>
                <p>Don't have a user account? Click here to <Link to="/sign-up">sign up</Link>!</p>
                
            </div>
        </main>
         </body>
    
        
    )
}

export default UserSignIn;