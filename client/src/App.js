import './styles/global.css'
import {useState, useEffect} from 'react'

function App() {

  const [courses, setCourse] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
    .then(res => res.json())
    .then(data => setCourse(data))
    console.log(courses)
  }, [])

  return (
    <h1>Hello</h1>
  );
}

export default App;
