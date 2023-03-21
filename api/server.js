const express = require("express")
const app = express()
const cors = require("cors")
const appify = require("./app")
const { fetchUrlContent } = require("./fetch-url-content")
const { clean } = require("./clean")
const { count } = require("./count")

app.use(cors())
app.use(express.urlencoded(({ extended: true })))
app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("Its working !")
// })

app.get("/", function (req, res) {
    res.send({ "name": "Jane Doe" }) // Should be json format
})

app.post("/", async function (req, res) {
    const url = req.body.url
    
    console.log({url});
    const content = await fetchUrlContent(url)
    const cleanedContent = clean(content)
    const result = count(cleanedContent)
    console.log("result in backend"+result.data.result.totalWords);
    res.json({result})
})



app.listen(3000, () => {
    console.log("app listening on port -  3000")
})