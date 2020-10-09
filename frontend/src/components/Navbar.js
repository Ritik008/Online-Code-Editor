import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Profile from "../image/profile.png"
const Navbar = () => {

    const[image, setImage] = useState("")
    const[name, setName] = useState("")
    const[emailName, setEmailName] = useState("")
    const localName = localStorage.getItem("user")


    useEffect(()=> {
        setImage(localStorage.getItem("profile"))
        setName(localStorage.getItem("username"))
        setEmailName(localName !== null ? JSON.parse(localStorage.getItem("user")).username: "")
    }, [])

    return (
              <nav className="navbar navbar-light bg-dark d-flex">
                    <Link className="navbar-brand text-light" href="/">Menu</Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
                    aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"><span className="text-light"><i
                    className="fas fa-bars fa-1x"></i></span></button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                    <ul className="navbar-nav mr-auto d-flex align-items-center flex-row justify-content-between">
                        <li className="nav-item active">
                            <Link to="/" className="navbar-link text-light">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="navbar-link text-light">Signup</Link>
                        </li>
                        <li className="nav-item">
                            {(emailName || name) ? <Link to="/logout" className="navbar-link text-light">Logout</Link> : <Link to="/login" className="navbar-link text-light">Login</Link> }
                        </li>
                        <li className="nav-item">
                                <img src={image ? image : Profile} className="profile-pic" />
                                <p className="user-name">{name ? name : emailName ? emailName : ""}</p>
                    </li>
                    </ul>
                </div>
                </nav>
    )
}

export default Navbar