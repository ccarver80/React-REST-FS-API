import React from 'react';
import './styles/global.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

//Components:
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignUp from './Components/UserSignUp'; 
import UserSignIn from './Components/UserSignIn'
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse'

function App() {
  
    return (
     <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/sign-up" element={<UserSignUp />} />
        <Route path='/sign-in' element={<UserSignIn />} />
        <Route path='/create-course' element={<CreateCourse />} />
        <Route path='/update-course/:id' element={<UpdateCourse />} />
      </Routes>
       
     </BrowserRouter>
    )
     
}

export default App;