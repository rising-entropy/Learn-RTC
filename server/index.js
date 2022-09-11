const app = require('express')();
const http = require('http').createServer(app);
const PORT = 8080;
const PORT2 = 8081;
const jwt = require('jsonwebtoken');
const cors = require("cors");
var SHA256 = require("crypto-js/sha256");
const UserModel = require('./models/UserModel');
const io = require('socket.io')(http,{cors: {origin: "*"}});
require("./config/database").connect();

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
});

app.post("/login", async(req, res)=>{
  let body = req.body
  body['password'] = SHA256(body['password'])
  let theUser = await UserModel.findOne({username: body['username']});
  if(!theUser){
    return res.status(404).json({
      message: "Username Does Not Exist!"
    });
  }

  theUser = JSON.parse(JSON.stringify(theUser))

  if(theUser['password'] == theUser['password']){
    let token = jwt.sign(theUser, "SECRET_KEY");
    return res.status(201).json({
      token,
      data: theUser
    })
  }else{
    return res.status(401).json({
      message: "Invalid Password!"
    });
  }

});

app.post("/register", async(req, res)=>{
  let body = req.body;
  body['password'] = SHA256(body['password'])
  try{
    let newUser = await UserModel.create(body);
    let token = jwt.sign(JSON.parse(JSON.stringify(newUser)), "SECRET_KEY")
    return res.status(201).json({
      message: "User Created Successfully!",
      data: JSON.parse(JSON.stringify(newUser)),
      token
    });
  }catch(e){
    console.log(e)
    return res.status(401).json({
      message: "Username Already Exists!"
    });
  }
})

app.listen(PORT2, () => {
  console.log(`Server Listening on ${PORT2}`);
});










io.listen(PORT);
