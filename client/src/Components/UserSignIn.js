import React from "react";
import Header from "./Header";
import {Link} from 'react-router-dom'


function UserSignIn() {

        // Build in auth. to check user signin info


    return(
        <body>
        <Header />
        <main>
            <div class="form--centered">
                <h2>Sign In</h2>
                
                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value="" />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value="" />
                    <button className="button" type="submit">Sign In</button><Link to="/"><button class="button button-secondary">Cancel</button></Link>
                </form>
                <p>Don't have a user account? Click here to <Link to="/sign-up">sign up</Link>!</p>
                
            </div>
        </main>
         </body>
    
        
    )
}

export default UserSignIn;