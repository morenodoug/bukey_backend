var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
const authRouter = require("./routes/auth")
const mongoose  = require("mongoose")
const config = require("./config")
const bodyParser = require('body-parser');
const { throws } = require('assert');
const cors = require("cors")
const serverIo = require("socket.io")
const authmiddleware = require("./middlewares/authMiddleware")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

console.log(config.databaseConnection)

mongoose.connect(config.databaseConnection, { useNewUrlParser: true,useUnifiedTopology: true })
.then(() =>console.log("conexion a bd exitosa"))
.catch ( (error)  =>  {throw error})
mongoose.set('useCreateIndex', true);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use("/auth" , authRouter)
app.use(authmiddleware)
app.use('/user', usersRouter);

const io = new serverIo(5000,{
  path:"",
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})
let connectedUsers = {};
io.on("connection", (socket) =>{
  console.log("user connected")
  let userId = socket.handshake.query.userId;
  console.log(userId);
  
  connectedUsers[userId] = socket
  console.log("connected ysers")
  console.log(connectedUsers)


  socket.on('conversation-message', (msg) => {
    console.log("receive")
    console.log(msg);
  });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
