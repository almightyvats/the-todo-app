import express from "express";
import { Server } from 'socket.io';
const app = express();
const port = 5000;

const server = require('http').createServer(app);

interface ITodo {
  taskName: string;
  taskCompleted: boolean;
}

let todoArray: ITodo[] = [];

interface ServerToClientEvents {
  todoAdded: (todo: ITodo) => void;
  todoModified: (todos: ITodo[]) => void;
  allTodosFetched: (todos: ITodo[]) => void;
}

interface ClientToServerEvents {
  addTodo: (todo: string) => void;
  modifyTodo: (todoToSetComplete: string) => void;
  fetchAllTodos: () => void;
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("addTodo", (todo) => {
    let newTodo: ITodo = { taskName: todo, taskCompleted: false };
    todoArray.push(newTodo);
    io.emit("todoAdded", newTodo);

    console.log("msg: ", todoArray);
  });

  socket.on("modifyTodo", (todoToSetComplete) => {
    todoArray.forEach(element => {
      if (element.taskName === todoToSetComplete) {
        element.taskCompleted = !element.taskCompleted;
      }
    });
    io.emit("todoModified", todoArray);
  });

  socket.on("fetchAllTodos", () => {
    io.emit("allTodosFetched", todoArray);
    console.log("msg-all", todoArray);
  })
});


server.listen(port, () => console.log(`Example app listening on port ${port}!`));
