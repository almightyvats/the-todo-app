import { io, Socket } from "socket.io-client";
import { ITask } from '../intefaces/task.interface'

interface ServerToClientEvents {
    todoAdded: (todo: ITask) => void;
    todoModified: (todos: ITask[]) => void;
    allTodosFetched: (todos: ITask[]) => void;
}
  
  interface ClientToServerEvents {
    addTodo: (todo: string) => void;
    modifyTodo: (todoToSetComplete: string) => void;
    fetchAllTodos: () => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:5000");

export default socket; 