const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const serverless = require("serverless-http");

const app = express();
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);

    // Emit the received message to all connected clients except the sender
    socket.broadcast.emit("receive_message", data);
  });
});

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
