import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'


function CourseDetail() {

    const [course, setCourse] = useState([]);

    let params = useParams(); //Gets the ":id" Param from the url clicked

    useEffect(() => {
        async function fetchData() {
          await fetch('http://localhost:5000/api/courses/' + params.id)
          .then((res) => res.json())
          .then((data) => setCourse(data));
      };
          fetchData(); 
      }, []);

      console.log(course)
    return (
    <body>
        <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
            <nav>
                <ul className="header--signedin">
                        {/* ADD LOGIN USERNAME */}
                    <li>Welcome, </li>
                             {/* ADD SIGNIN ROUTE */}
                    <li><Link to="SIGNOUT ROUTE">Sign Out</Link></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
            <div className="actions--bar">
                <div className="wrap">            
                                                {/* UPDATE COURESE ROUTE */}
                    <Link className="button" to="update-course.html">Update Course</Link>
                                                {/* Delete course route  */}
                    <Link className="button" to="#">Delete Course</Link>

                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>

            
    </main>
    </body>
    )
        
    
}

export default CourseDetail; 