import express from "express";

const app = express();
const port = 5000;

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    },
});

interface ITodo {
  taskName: string;
  taskCompleted: boolean;
}

let todoArray: ITodo[] = [];

io.on("connection", function(socket: any) {
    console.log("a user connected");

    socket.on("add-todo", function(todo: string) {
      let newTodo: ITodo = {taskName: todo, taskCompleted: false};
      todoArray.push(newTodo);      
      socket.emit("todo-added", newTodo);

      console.log("msg: ", todoArray);
    });

    socket.on("modify-todo", function(todoToSetComplete: string) {
      todoArray.forEach(element => {
        if (element.taskName === todoToSetComplete) {
          element.taskCompleted = !element.taskCompleted;
        }
      });
      socket.emit("todo-modified", todoArray);
    });

    socket.on("intial-todo-fetch", function() {
      socket.emit("todo-all-fetched", todoArray);
      console.log("msg-all", todoArray);
    });
  });


server.listen(port, () => console.log(`Example app listening on port ${port}!`));
