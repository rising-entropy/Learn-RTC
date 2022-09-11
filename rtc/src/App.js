import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import socketClient  from "socket.io-client";
import axios from 'axios';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
const SERVER = "http://localhost:8080";



function App() {

  const [showScreen, setShowScreen] = useState(false)

  var socket = socketClient (SERVER, {
    rejectUnauthorized: false // WARN: please do not do this in production
  });

  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.emit("hello", "Hello There!!")
  });

  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([])

  const submitHandler = e => {
    e.preventDefault();
    console.log(message)
    socket.emit("messageSent",message, (response) => {
      console.log(response); // "got it"
    });
    setMessage("");
  }

  const getMessages = async()=>{
    axios.get("http://localhost:8081/messages")
    .then((response)=>{
      setMessagesList(response.data)
      setShowScreen(true)
    })
    .catch((e)=>console.log(e))
  }

  useEffect(()=>{
    getMessages()
  }, [])

  socket.on("listOfMessages", (lstOfMessages)=>{
    setMessagesList(lstOfMessages)
  });


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<SignUpPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
