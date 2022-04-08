// import logo from './logo.svg';
import './App.css';
import socketIO from "socket.io-client"
import MainForm from './Component/MainForm';

import {
  BrowserRouter as Router,
  
  Routes,
  Route
} from "react-router-dom";
import ChatRoom from './Component/ChatRoom';

// const ENDPOINT = 'http://localhost:5000/'
// const socket = socketIO(ENDPOINT, { transports: ['websocket'] })

function App() {

  // socket.on("connect", () => {

  // })
  // var socket = socketClient (SERVER);
  // let name= document.getElementById("name").value
  return (
    <div className="App">
      {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
      
        </a> 
        </header>  */}

        

      <Router>
        <Routes>
          <Route index element={<MainForm/>}></Route>
          <Route  path="/chat/:RoomName" element={<ChatRoom/>}></Route>
          <Route path ="*" element={<h1>404 page not found</h1>}></Route>
        </Routes>
        </Router>
      
      {/* <h1>CHAT-APP</h1> */}
      {/* <input type="text" id="name" value="Name"/> */}

    </div>
  );
}

export default App;
