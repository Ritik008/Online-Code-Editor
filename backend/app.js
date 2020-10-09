require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const apiRouter = require("./routes/api")
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const cors = require("cors")

// initialize app
const app = express()

// cors
app.use(cors())

// database connection
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(()=> {
    console.log("connected to database")
}).catch((e)=> {
    console.log(e)
})


// middleware
app.use(express.json())
app.use(apiRouter)
app.use("/auth", authRouter)
app.use("/user", userRouter)

const port = process.env.PORT || 8000
app.listen(port, ()=> console.log(`Server is up at port ${port}`))