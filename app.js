const five = require("johnny-five");
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const { sendEmail } = require('./utility');
const config = require('./config');

const InitialState = config.InitialState;
let counter = config.InitialState.counter;
const board = new five.Board();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function (socket) {
  console.log('connected');
  socket.on('disconnect', function () {
    console.log('disconnected');
  });
  socket.on('formSubmit', function (value) {
    console.log(value);
    if (InitialState.secretPassword === value.pwd) {
      InitialState.emailTo = value.email;
      InitialState.status = value.status;
      io.emit('success');
    }
    else {
      io.emit('fail');
    }
  })

});
board.on('ready', function () {

  let led = new five.Led(config.LED);
  let motion = new five.Motion(config.PIR);

  motion.on('calibrated', () => {
    console.log('calibrated');
  });
  motion.on('motionstart', () => {
    if (InitialState.status) {
      console.log('motionstart');
      let result = [];
      result[0] = InitialState.emailTo;
      result[1] = datetime = new Date().toLocaleString();
      sendEmail(result[0], result[1], counter, io);
      result[2] = 'Detected';
      result[3] = 'Sending..'
      io.emit('motionDetected', result);
      led.on();
      counter++;
    }

  })
  motion.on('motionend', () => {
    console.log('motionend');
    led.off();
  })
})



http.listen(3000, function () {
  console.log('App is listening to port 3000');

});

