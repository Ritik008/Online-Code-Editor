const router = require("express").Router()
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const GoogleUser = require("../models/GoogleUser")

router.post("/signup", async (req, res)=> {
    const {username, email, password} = req.body    
    try {
        if(!username || !email || !password) {
            return res.status(422).json({error: "Please enter username email or password"})
        }

        const savedUser = await User.findOne({email})
        if(savedUser) {
            return res.json({error: "User already exists"}) 
        }

        const user = await new User({
            username,
            email,
            password
        })
    
        user.save().then(()=> res.json({message: "User Created!!"}))

    }catch(e) {
        console.log(e)
    } 
})


router.post("/login", async (req, res)=> {
    const {email, password} = req.body
    try {
        if(!email || !password) {
            return res.status(422).json({error: "Please enter email or password"})
        }      
        const user = await User.findByCredentials(email, password)
       
        if(user) {  
            const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET)
            const {id, username, email} = user
            res.json({user: {id, username, email}, token})
        }else {
            res.json({error: "Invalid email Id and password"})
        }

    }catch(e) {
        console.log(e)
    }
})

// google login
router.post("/google", async (req, res) => {
    const {googleId, email, username, profile} = req.body
    try {
        const user = await GoogleUser.findOne({googleId})
        if(!user) {
            const newUser = new GoogleUser({
                googleId, email, username, profile  
            })
            await newUser.save()
        }
        res.json({id: user.id})
    }catch(e) {
        console.log(e)
    }
})



module.exports = router