import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);


const users = [
    {name: "ithai" ,status: "online"},
    {name: "john" ,status: "offline"},
    {name: "michael" ,status: "notRegistered"}
]


app.use(express.static("public"));
app.use(express.json())

import { Server } from "socket.io";
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("connected: ",socket.id);
    socket.emit("users", users)
    socket.on("disconnect", ()=> {
        users.forEach(user => {
            if (user.connectionId === socket.id){
                user.status = "offline"
            }
        })
        socket.emit("users", users)
    })
    socket.on("login", (data)=> {
        users.forEach(user => {
            if (user.name === data.name){
                user.status = "online"
                user.connectionId = socket.id
            }
        })
        socket.emit("users", users)
    })
});



server.listen(8080, () => console.log("Server is running on port", 8080));
