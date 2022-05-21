const express = require("express");
const cors = require("cors")
const app = express()
const {Server} = require("socket.io")

app.use(cors())

const io = new Server({
  cors:{
    origin:"http://localhost:3000"
  }
})
io.on("connection",(socket)=>{
  console.log("User connected")
socket.on("joinRoom",(data)=>{
  socket.join(data)
  console.log(`User : ${socket.id} joined ${data}`)
})

  socket.on("sendMessage",(data)=>{
    socket.to(data.room).emit("receiveMessage",data)  })

  socket.on("disconnect",()=>{
    console.log("User disconneted")
  })
})

io.listen(8000)

app.listen(9000,()=>{
  console.log("server connected")
})



