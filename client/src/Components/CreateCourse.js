import React, { useState } from "react";
import Header from "./Header";
import {Link} from 'react-router-dom'

function CreateCourse()  {

    const [course, setCourse] = useState({})


    const createCourse = async(e) => {
        e.preventDefault(); 
   await fetch('http://localhost:5000/api/courses', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify()
    })
    .then(res => console.log(res)) 
    .catch((err) => {
        console.log(err)
    })
    
}


    return(
        <body> 
        <Header />
        
        <main>
            <div class="wrap">
                <h2>Create Course</h2>

                {/* TODO: RENDER VALIDATION */}
                <div class="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form onSubmit={createCourse}>
                    <div class="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={(e) => setCourse({...course, title: e.target.value})} />

                            <p>By Joe Smith</p>

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
                    <button class="button" type="submit">Create Course</button><Link to='/' ><button class="button button-secondary">Cancel</button></Link>
                </form>
            </div>
        </main>

        </body>
    )
}

export default CreateCourse; 