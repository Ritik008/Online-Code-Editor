const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User")

module.exports = (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json({error: "Unauthorized user"})
    }
    const token = authorization.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, payload)=> {
        if(err) {
            return res.status(401).json({error: "Please login"})
        }
        const {id} = payload
        User.findById(id).then(userdata => {
            req.user = userdata
            next()
        })
    })
}