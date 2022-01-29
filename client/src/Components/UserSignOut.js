import react, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const UserSignOut = (props) => {
    const [clear, setClear] = useState({})

    useEffect(()=> {
        const clearData = () => {
            props.removeLoginInfo({clear})
            
        }
        clearData(); 
    }, [clear])

    return(
        <div>
        <h1>Sucsessfully signed out!</h1>
        <Link to='/'><button>click here to go back</button></Link>
        </div>
    )
}

export default UserSignOut;