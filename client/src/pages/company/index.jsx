import React, { useContext } from 'react'
import Navbar from '../../components/navbar'
import { AuthContext } from '../../context/authContext'
import './index.css'
import cookie from '../../assets/cookie.svg'

function Company() {

    const { user } = useContext(AuthContext)

    return (
        <div>
            <Navbar />
            <p className='company-p-welcome'>Welcome to Bite, develop MERN web apps faster&nbsp;<img style={{ aspectRatio: 1, width:'32px'}} src={cookie}/></p>
        </div>
    )
}

export default Company