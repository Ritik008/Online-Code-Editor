const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const CodeSchema = new mongoose.Schema({
    code: {
        type: String
    },
    postedBy: {
        type: ObjectId,
        ref: "user"
    }
})

const Code = mongoose.model("code", CodeSchema)

module.exports = Code