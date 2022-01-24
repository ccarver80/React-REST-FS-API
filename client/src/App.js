import React from 'react';
import './styles/global.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

//Components:
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail'; 


function App() {
  
    return (
     <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Courses />} />
        <Route path="/api/courses/:id" element={<CourseDetail />} />
      </Routes>
       
     </BrowserRouter>
    )
     
}

export default App;