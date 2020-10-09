const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
        const user = await User.findOne({ email })
        if(!user) {
            return null
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return null
        }
        return user
}

userSchema.pre("save", async function(next) {
    const genSalt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, genSalt)
    next()
})

const User = mongoose.model("user", userSchema)
module.exports = User