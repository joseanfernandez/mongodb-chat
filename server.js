var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require('body-parser')
var app = express()
var conString = 'mongodb://localhost:27017/chat'
app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.Promise = Promise
var Chats = mongoose.model("Chats", {
    name: String,
    chat: String
})
mongoose.connect(conString, { useNewUrlParser: true }, (err) => {
    console.log("Database connection", err)
})
app.listen(3020, () => {
    console.log("Well done, now I am listening...")
})


app.post("/chats", async (req, res) => {
  console.log('try');
  console.log(req.body);
  try {
    console.log('saved');
      var chat = new Chats(req.body)
      // await chat.save()
      // res.sendStatus(200)
  } catch (error) {
      res.sendStatus(500)
      console.error(error)
  }
})