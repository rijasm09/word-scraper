const express = require("express")
const app = express()
const cors = require("cors")
const appify = require("./app")

app.use(cors())
app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("Its working !")
// })

app.get("/", function (req, res) {
    res.send({ "name": "Jane Doe" }) // Should be json format
})

app.listen(3000, () => {
    console.log("app listening on port 3000")
})