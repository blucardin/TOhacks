const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { Client } = require('pg')

const client = new Client(process.env.DATABASE_URL)

client.connect()


app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      console.log('message: ' + msg.X + ' ' + msg.Y + ' ' + msg.F);
      console.log("YAYA");
      });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});