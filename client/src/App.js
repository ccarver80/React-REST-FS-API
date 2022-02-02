import React, { useEffect, useState } from "react";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"

//==========Components:========================================================//
  import Header from "./Components/Header";
  import Courses from "./Components/Courses";
  import CourseDetail from "./Components/CourseDetail";
  import UserSignUp from "./Components/UserSignUp";
  import UserSignIn from "./Components/UserSignIn";
  import CreateCourse from "./Components/CreateCourse";
  import UpdateCourse from "./Components/UpdateCourse";
  import UserSignOut from "./Components/UserSignOut";
  import PrivateRoute from "./PrivateRoute";
//=============================================================================//


function App() {
  const [userLoginInfo, setLoginInfo] = useState({}); //User Login info from UserSignIn component
  const [userAuth, setAuth] = useState(false); // True/False if user is logged in or not
  const [name, setUserName] = useState({
    firstName: '',
    lastName: '', 
    id: ''
  }); //Gets users first name and id after fetch request to api was successful 



  const getInfo = (value) => setLoginInfo(value); //gets login info from UserSignIn component
  const removeLoginInfo = (value) => setLoginInfo(value); //gets the empty object back from UserSignOut component
  

  useEffect(async() => {
   
    const sendUserInfo = async (e) => {
      const encodedCreds = btoa(
        `${userLoginInfo.emailAddress}:${userLoginInfo.password}`
      );
      await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCreds}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          
            //If data.firstname exists, that means the fetch properly authorized, sends username to header and setAuth to true
            if(data.firstName) {
              setUserName({
                firstName: data.firstName,
                lastName: data.lastName, 
                id: data.id
              })  
              setAuth(true);
              
            }
            else {
              
              setUserName({}); //If signed out button is clicked, clears name object
              setAuth(false); // and returns false to auth
            }
          }
        )
        .catch((err) => {
          console.log("There seems to be an error:", err);
        });
     
  }
    //calls the function anytime the userLoginInfo state changes.
    sendUserInfo();
  }, [userLoginInfo]);

  
//==============================================================================================================================//
  return (
    <BrowserRouter>
      <Header auth={userAuth} name={name} />
      <Routes>
        <Route exact path="/" element={<Courses />} />

        <Route path="/course/:id" element={<CourseDetail auth={userAuth} creds={userLoginInfo} userId={name.id} />} />

        <Route path="/sign-up" element={<UserSignUp onLogin={getInfo} />} />

        <Route path="/sign-in" element={<UserSignIn auth={userAuth} onLogin={getInfo} />}/>
{/* ===============================Protected Routes ================================================================= */}
        <Route element={<PrivateRoute auth={userAuth}/>}>

          <Route path="/create-course" element={<CreateCourse creds={userLoginInfo} name={name}/>} />

          <Route path="/update-course/:id" element={<UpdateCourse creds ={userLoginInfo}/>} />

        </Route>
{/* ================================================================================================================== */}
        <Route path="/sign-out" element={<UserSignOut removeLoginInfo={removeLoginInfo} />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
