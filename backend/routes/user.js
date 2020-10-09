const router = require("express").Router()
const UserCode = require("../models/Code")
const GoogleUser = require("../models/GoogleUser")

router.post("/upload", async (req, res)=> {
    const {localUser, googleUser, code} = req.body
    const GUser = googleUser !== '' ? googleUser : ""
    const LUser = localUser !== null ? localUser : ""
    let userId = ""
    if(GUser) {
        userId = await GoogleUser.findOne({googleId: GUser})
        userId = userId.id
    }else {
        userId = LUser
    }

    const saveCode = new UserCode({
        code,
        postedBy: userId
    })
    await saveCode.save()
    res.json({})
})

router.get("/code/:id", async (req, res)=> {
    try {
        const getCode = await UserCode.find({postedBy: req.params.id})
        res.json({code: getCode})
    }catch(e) {
        console.log(e)
    }
})


module.exports = router