import express, { Request, Response } from "express";

const app = express();
const port = 5000;

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    },
});

let todoArray: string[] = [];

io.on("connection", function(socket: any) {
    console.log("a user connected");

    socket.on("msg", function(todo: string) {
      todoArray.push(todo);
      console.log(todoArray);
      
      socket.emit("todo-added", todo);
    });
  });


server.listen(port, () => console.log(`Example app listening on port ${port}!`));
