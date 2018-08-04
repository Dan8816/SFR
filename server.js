// require express
const express = require("express");
// path module -- try to figure out where and why we use this
const path = require("path");
// create the express app
const app = express();
const bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// tell the express app to listen on port 1337
const server = app.listen(1337, function() {
 console.log("listening on port 1337");
});
const io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
    console.log('Client/socket is connected!');
    console.log('Client/socket id is: ', socket.id);

    socket.on('posting_form', function(data) {
        console.log("posting_form triggered on server");
        socket.emit("updated_message", {name: data.name, location: data.location, language: data.language, comment: data.comment});
        var rand_num = Math.floor((Math.random() * 1000 + 1));
        socket.emit('random_number', {num: rand_num});
    })
})
// declare session
var session = require('express-session');
// use session:
app.use(session({
  secret: 'My_SecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }//max session is 60K milliseconds
}))
require("./server/config/routes")(app)