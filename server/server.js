require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("./config/database").connect();

app.use(cors());
app.use(express.json());

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });
  socket.on('example_message', function(msg){
    console.log('message: ' + msg);
  });
});
io.listen(8000);

app.get('/',(req,res)=>{
  res.json({message:'Welcome to ChatPort!'})
})


// const port = process.env.PORT || 5000;
// server.listen(port, () => {
//   console.log(`Server Listening on ${port}`);
// });