const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

app.post("/", function (req, res) {
 // fetch the content from the URL
 // clean the content
 // count the word occurrence and send it back
})

module.exports = app