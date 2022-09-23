import express from "express"
const app = express()

app.get("/timestamp", (req, res) => {
    console.log("end point hitted");
    res.send({time: new Date().toISOString()})
})

app.get("/fastApi/time",async(req,res)=> {
    const response = await fetch("https://127.0.0.1:8080/timestamp")
    const timeInPythonWorld = await response.json()
    res.send(timeInPythonWorld)
})

app.listen(4200, () => console.log("Server on port", 4200))