import React from 'react' 

import Courses from './Courses'
import { useEffect, useState } from 'react'

const UserSignOut = (props) => {
    const [clear] = useState({})

    useEffect(()=> {
        const clearData = () => {
            props.removeLoginInfo({clear})
            
        }
        clearData(); 
    }, [clear])

    return(
        <div>
        <Courses />
        </div>
    )
}

export default UserSignOut;