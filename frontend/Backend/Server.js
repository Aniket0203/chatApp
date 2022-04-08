
// const http = require("http")
// const express = require("express")
// const app = express()
// const cors = require("cors")
// const { Server } = require("socket.io")

// const PORT = 5000;

// app.use(cors());

// const server = http.createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET","POST"]

//     }
// })

// app.get('/', (req, res) => {
//     res.send("welcome to goa singham")
// })

// io.on("connection", (socket) => {
//     // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
//  console.log(socket.id)


//     socket.on("join_room", room => socket.join(room))

//     socket.on("newMessage", ({ newMessage, room }) => {
//         console.log(room, newMessage)
//         io.in(room).emit("getLatestMessage")

//     })
// });

// server.listen(PORT, () => {
//     console.log(`server started on${PORT}`)
// })


const express = require("express")
const { Server } = require("socket.io");
var http = require('http');
const cors = require("cors")

const app = express()
app.use(cors())

var server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {res.send("Welcome to goa singham"); res.end()})
app.post("/",(req,res)=>{res.send(newMessage, room)})

io.on("connection", (socket) => {
  console.log(socket.id)

   socket.on("join_room", room => {
		socket.join(room)
  //   //     socket.on("join_room", room => socket.join(room))

   })
      //  socket.on("join_room", room => socket.join(room))

  socket.on("newMessage", ({newMessage, room}) => {
    io.in(room).emit("getLatestMessage", newMessage)
  })

});

const port = process.env.PORT || 5000

server.listen(port, console.log(`App started at port ${port}`))