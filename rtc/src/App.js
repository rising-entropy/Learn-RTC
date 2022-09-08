import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import socketClient  from "socket.io-client";
import axios from 'axios';
const SERVER = "http://localhost:8080";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
      {showScreen ? <>
        <div>
          <h6>Previous Messages</h6>
          {
            messagesList.map((e,i)=><p>{e}</p>)
          }
        </div>
        <form onSubmit={submitHandler}>
          <input value={message} type="text" name="message" id="message" onChange={e=>setMessage(e.target.value)} required />
          <button type="submit">Send!</button>
        </form>
      </> : <>Loading...</>}
    </div>
  );
}

export default App;
