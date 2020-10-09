const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    username: {
        type: String,
        required: true,
    }
})


const GoogleUser = mongoose.model("GoogleUser", userSchema)
module.exports = GoogleUser