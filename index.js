const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const app = express()
const conString = 'mongodb://localhost:27017/chat'
const http = require("http").Server(app)
const io= require("socket.io")(http)
app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.Promise = Promise
const Message = require('./message');

io.on("connection", (socket) => {
})

mongoose.connect(conString, { useNewUrlParser: true }, (err) => {
    console.log("Successfully connected to Chat database");
}) 

const server = http.listen(3000, () => {
  console.log("Listening on ", server.address().port);
})

app.post("/messages", async (req, res) => {
  try {
      message = new Message(req.body)
      await message.save()
      res.sendStatus(200)
      io.emit("chat", req.body)
  } catch (error) {
      res.sendStatus(500)
  }
})


app.get("/messages", (req, res) => {
  Message.find({}, (error, messages) => {
      res.send(messages)
  })
})