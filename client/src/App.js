import React, { useEffect, useState } from "react";
import "./styles/global.css";
import { BrowserRouter, Route, Routes, } from "react-router-dom";

//Components:
import Header from "./Components/Header";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";
import UserSignUp from "./Components/UserSignUp";
import UserSignIn from "./Components/UserSignIn";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";
import UserSignOut from "./Components/UserSignOut";






function App() {
  const [userLoginInfo, setLoginInfo] = useState({});
  const [userAuth, setAuth] = useState(false);
  const [name, setUserName] = useState({});
  

  const getInfo = (value) => setLoginInfo(value);

  useEffect(() => {
    //Function to handle the userLoginInfo from "UserSignin.js" and get Basic Authorization.
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
          if (data.firstName) {
            //If data.firstname exists, that means the fetch properly authorized, sends username to header and setAuth to true
            setUserName(data.firstName);
            setAuth(true);
          } 
          
          else {
            setUserName({}); //If signed out button is clicked, clears name object
            setAuth(false, data); // and returns false to auth
          }
        })
        .catch((err) => {
          console.log("There seems to be an error:", err);
        });
    };
    //calls the function anytime the userLoginInfo state changes.
    sendUserInfo();
    ;
  }, [userLoginInfo]);

  const removeLoginInfo = (value) => setLoginInfo(value);

  return (
    
    <BrowserRouter>
    <Header auth={userAuth} name={name}/>
      <Routes>
        <Route
          exact
          path="/"
          element={<Courses />}
        />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/sign-up" element={<UserSignUp />} />
        <Route
          path="/sign-in"
          element={<UserSignIn auth={userAuth} onLogin={getInfo} />}
        />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/update-course/:id" element={<UpdateCourse />} />
        <Route
          path="/sign-out"
          element={<UserSignOut removeLoginInfo={removeLoginInfo} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
