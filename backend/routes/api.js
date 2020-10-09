const router = require("express").Router()
const HackerEarthApi = require('node-hackerearth')
require("dotenv").config()

const CLIENT_SECRET = process.env.CLIENT_SECRET
const api = new HackerEarthApi(CLIENT_SECRET)


router.post("/api", (req, res)=> {
    const source = req.body.source
    const lang = req.body.lang
    const input = req.body.input
    const config = {
        time_limit: 1,
        memory_limit: 323244,
        source: source,
        input: input,
        lang: lang
    }
    
    api.compile(config, (err,data) => {
        if(err) {
            console.log(err)
        }
    })
    
    api.run(config, (err,data) => {
        if(err) {
            console.log(err)
        } else {
            res.json({data})
        }
    })
})

module.exports = router