const app = require('express')();
const http = require('http').createServer(app);
const PORT = 8080;
const PORT2 = 8081;
const cors = require("cors");
const io = require('socket.io')(http,{cors: {origin: "*"}});

let listOfMessages = []

app.use(cors());
app.use(require('express').json());

io.on("connection", (socket) => {

  socket.on("hello", (message)=>{
    console.log("Message from Hello!")
    console.log(message)
  })

  socket.on("messageSent", (message)=>{
    console.log("Message from Hello!")
    listOfMessages.push(message)
    socket.broadcast.emit("listOfMessages", listOfMessages)
  })

});

app.get("/", (req, res)=>{
  res.json({message: "ChatPort"})
})

app.get("/messages", (req, res)=>{
  return res.json(listOfMessages)
})

app.listen(PORT2, () => {
  console.log(`Server Listening on ${PORT2}`);
});










io.listen(PORT);
