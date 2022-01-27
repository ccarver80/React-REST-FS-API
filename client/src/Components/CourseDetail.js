import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, Link } from "react-router-dom";

function CourseDetail() {
  const [course, setCourse] = useState([]);

  let params = useParams(); //Gets the ":id" Param from the url clicked

  useEffect(() => {
    function fetchData() {
      fetch("http://localhost:5000/api/courses/" + params.id)
        .then((res) => res.json())
        .then((data) => setCourse(data))
        .catch((err) => console.log("OH NO", err));
    }
    fetchData();
  }, []);

  return (
    // ==================================================================================
    //                        Header with Login Info
    <div>
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
            <ul className="header--signedin">
              {/* ADD LOGIN USERNAME */}
              <li>Welcome, </li>
              {/* ADD SIGNIN ROUTE */}
              <li>
                <Link to="SIGNOUT ROUTE">Sign Out</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/*==============================================================================================*/}
      {/* Link buttons */}
      <main>
        <div className="actions--bar">
          <div className="wrap">
            
            <Link className="button" to={"/update-course/" + params.id}>
              Update Course
            </Link>
            
            <Link className="button" to="/delete-course">
              Delete Course
            </Link>

            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
        {/* ========================================================================================== */}
        {/* Course title and details */}
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                {/* Header of each course */}
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>

                {/*Conditinal Statement to check if user name exists. Had problems rendering without the conditional statement*/}
                {course.User ? (
                  <p>
                    By: {course.User.firstName} {course.User.lastName}
                  </p>
                ) : (
                  <p>"Uh oh, could not get name"</p>
                )}

                {/* Markdown description */}
                <ReactMarkdown children={course.description} />
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>

                <ReactMarkdown className="course--detail--list">
                  {course.materialsNeeded}
                </ReactMarkdown>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CourseDetail;
