import React, {useState, useEffect} from "react"
import {GoogleLogin} from "react-google-login"
import {GoogleClientId} from "../keys"
import {Link} from "react-router-dom"
const Signup = () => {
    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [googleId, setGoogleId] = useState("")
    const [name, setUserName] = useState("")
    const [googleEmail, setGoogleEmail] = useState("")
    const [profile, setProfile] = useState("")

    
    const postData = async () => {
        const res = await fetch("/auth/signup", 
        {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                email: email,
                password, password
            })
        })
        
        const data = await res.json()
        if(data.error) {
            setError(data.error)
        }else {
            window.location.href="/"
        }
    }

    const responseGoogle = async (res) => {
        setGoogleEmail(res.profileObj.email)
        setGoogleId(res.profileObj.googleId)
        setUserName(res.profileObj.name)
        setProfile(res.profileObj.imageUrl)

    const result = await fetch("/auth/google", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                googleId: res.profileObj.googleId,
                email: res.profileObj.email,
                username: res.profileObj.name,
                profile: res.profileObj.imageUrl
            })
        })
        const data = await result.json()
        localStorage.setItem("user", JSON.stringify(data))
        window.location.href="/"
    }

    useEffect(()=> {
        localStorage.setItem("username", name)
        localStorage.setItem("googleEmail", googleEmail)
        localStorage.setItem("profile", profile)
        localStorage.setItem("googleId",googleId)
    }, [name, googleEmail, profile, googleId])
   


    return (
        <div className="container jubmotron card shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <p className="display-4 text-center">Signup</p>
                {error && <div className="error mb-3">{error}</div> }
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input type="text" placeholder="Username" id="name" className="form-control" name="username" value={username} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Id</label>
                    <input type="email" placeholder="Email Id" id="email" className="form-control" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>             
                </div>
                <div className="login-strategy">
                    <button className="btn btn-primary mb-3 w-100 p-2" onClick={postData}>Signup</button>
                </div>
                <div className="text-right mb-3">
                    <Link to="/login" className="text-dark">Already have an account?</Link>
                </div>
                <div className="d-flex flex-column text-center">
                    <p className="text-secondary">or you can sign in with</p>
                    <div className="d-flex justify-content-center">
                    <GoogleLogin 
                            clientId={GoogleClientId}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                    </div>
                </div>
        </div>
    )
}

export default Signup