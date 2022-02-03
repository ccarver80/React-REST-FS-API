import React, {useState, useEffect} from "react";

import { Link, useParams, Navigate, useNavigate} from 'react-router-dom'

function UpdateCourse(props) {
    const [course, setCourse] = useState({});

    let params = useParams(); //Gets the ":id" Param from the url clicked

    const nav = useNavigate(); 

    useEffect(() => {
        function fetchData() {
          fetch("http://localhost:5000/api/courses/" + params.id)
            .then((res) => res.json())
            .then((data) => setCourse(data))
            .catch((err) => console.log("OH NO:", err));
        }
        fetchData();
      }, [setCourse]);
    
      const updateCourse = async(e) => { 
       
        e.preventDefault(); 
         const encodedCreds = btoa(
             `${props.creds.emailAddress}:${props.creds.password}`
           );
        
    await fetch('http://localhost:5000/api/courses/' + params.id, {
         method: 'PUT', 
         headers : {
             'Content-Type': 'application/json', 
             Authorization: `Basic ${encodedCreds}`,
         }, 
         body: JSON.stringify(course)
     }).then((res) =>  res.json())
     .then((data) => {
         if(data.message) {
           setCourse(data.message.errors)
            
         }else{
             nav('/course/' + data)
         }
        })
     
     .catch((err) => {
         console.log('error message', err)
     }); 
         
    
      
     }
    return(
        <body>
            
            <main>
            <div class="wrap">
                <h2>Update Course</h2>
                <form onSubmit={updateCourse}>
                    <div class="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={(e) => setCourse({...course, title: e.target.value})} />

                            <p>By {course.firstName} {course.lastName}</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={course.description} onChange={(e) => setCourse({...course, description: e.target.value})}></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime} onChange={(e) => setCourse({...course, estimatedTime: e.target.value})} />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded} onChange={(e) => setCourse({...course, materialsNeeded: e.target.value})}></textarea>
                        </div>
                    </div>
                    <button class="button" type="submit">Update Course</button><Link to='/'><button class="button button-secondary">Cancel</button></Link>
                </form>
            </div>
        </main>
        </body>
    )
}

export default UpdateCourse;