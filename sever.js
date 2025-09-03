const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // cho phép mọi client kết nối
  }
});

io.on("connection", (socket) => {
  console.log("Người chơi kết nối:", socket.id);

  socket.on("move", (move) => {
    console.log("Nước đi:", move);
    // gửi nước đi tới tất cả client khác
    socket.broadcast.emit("move", move);
  });

  socket.on("disconnect", () => {
    console.log("Người chơi thoát:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});
