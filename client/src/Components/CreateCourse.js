import React, { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'



function CreateCourse(props)  {

    const nav = useNavigate();

    const [course, setCourse] = useState({
        userId: props.name.id,
    })
     const [data, setData] = useState(12)
   
    // ======================CLEARS ALL DATA===========================
            useEffect(() => {
                
                setData()
            }, [setData])

   
    const createCourse = async(e) => { 
       
       e.preventDefault(); 
        const encodedCreds = btoa(
            `${props.creds.emailAddress}:${props.creds.password}`
          );
       
   await fetch('http://localhost:5000/api/courses', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json', 
            Authorization: `Basic ${encodedCreds}`,
        }, 
        body: JSON.stringify(course)
    }).then((res) =>  res.json())
    .then((data) => {
        if(data.message) {
          setData(data.message.errors)
            
        }else{
            nav('/course/' + data)
        }
    })
    .catch((err) => {
        console.log('error message', err)
    }); 
        
    
      readMap(); 
    }


const readMap = () => {
    data.map((message => {
        if(message.message === 'A title is required') {
            console.log('title!!')
             setData({...data, title: 'Please provide a value for "Title"'})
        } if(message.message === 'A description is required'){
            console.log('desc!!')
            return setData({...data, desc: 'Please provide a value for "Description"'})
        }
        }))
}

    return(
        <body> 
       
        
        <main>
            <div className="wrap">
                <h2>Create Course</h2>

                {/* TODO: RENDER VALIDATION */}
                {data ? 
                <div className="validation--errors">
                
                    <h3>Validation Errors</h3>
                    <ul>
                            
                             <li>{data.title}</li>
                            
                            
                            <li>{data.desc}</li>
                        
                        
                    
                         
                        
                        
                          
                    </ul>
                </div>
                : ''
                }
                <form onSubmit={createCourse}>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={(e) => setCourse({...course, title: e.target.value})} />

                            <p>By {props.name.firstName} {props.name.lastName}</p>

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