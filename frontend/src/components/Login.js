import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {GoogleLogin} from "react-google-login"
import {GoogleClientId} from "../keys"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [googleId, setGoogleId] = useState("")
    const [username, setUserName] = useState("")
    const [googleEmail, setGoogleEmail] = useState("")
    const [profile, setProfile] = useState("")

    const postData = async (e) => {
        const res = await fetch("/auth/login", 
        {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password, password
            })
        })
        
        const data = await res.json()
        if(data.error) {
            setError(data.error)
        }else {
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            window.location.href="/"
        }
    }
    const responseGoogle = async (res) => {
        setGoogleId(res.profileObj.googleId)
        setGoogleEmail(res.profileObj.email)
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
        localStorage.setItem("username", username)
        localStorage.setItem("googleEmail", googleEmail)
        localStorage.setItem("profile", profile)
        localStorage.setItem("googleId",googleId)
    }, [username, googleEmail, profile, googleId])
   
    return (
        <div className="container jubmotron card shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <p className="display-4 text-center">Login</p>
                {error && <div className="error mb-3">{error}</div> }
                <div className="form-group">
                    <label htmlFor="email">Email Id</label>
                    <input type="email" placeholder="Email Id" id="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} value={password}/>             
                </div>
                <div className="login-strategy">
                    <button className="btn btn-primary mb-3 w-100 p-2" onClick={postData}>Login</button>
                </div>
                <div className="text-right">
                    <Link to="/signup" className="text-dark">Signup</Link>
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

export default Login