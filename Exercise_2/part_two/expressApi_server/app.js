import express from "express"

const app = express()

app.get("/timestamp", (req, res) => {
    res.send({time: new Date().toISOString()})
})

app.listen(8080, () => console.log("Server on port", 8080))