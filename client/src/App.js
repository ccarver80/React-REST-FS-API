import React from 'react';
import './styles/global.css'
import {BrowserRouter, Route} from 'react-router-dom'

//Components:
import Courses from './Components/Courses';


function App() {
  
    //Will not render component, tried using the "return () aswell."
     <BrowserRouter>
       <Route path="/" component={Courses} />
     </BrowserRouter>
    
     
}

export default App;
