import { useState, useEffect, FC } from 'react';
import Todo from './components/todo.component';
import { ITask } from './intefaces/task.interface'

import io from "socket.io-client";
import AddTodo from './components/addTodo.component';
const socket = io("http://localhost:5000");

const App: FC = () => {

  const [todoArray, setTodoArray] = useState<ITask[]>([]);

  useEffect(() => {
    socket.emit("intial-todo-fetch");
    socket.on("todo-all-fetched", (payload: ITask[]) => {
      setTodoArray(payload);
    });
    console.log("Inside all");
  }, []);

  const handleBtnPress = (event: React.MouseEvent<HTMLElement>, todo: string): void => {
    event.preventDefault();
    socket.emit("add-todo", todo);
  }

  useEffect(() => {
    socket.on("todo-added", (payload: ITask) => {
      setTodoArray([...todoArray, payload]);
    });
    socket.on("todo-modified", (payload: ITask[]) => {
      setTodoArray(payload);
    });
  }, [todoArray]);

  const handleTaskCompletion = (taskToSetComplete: string): void => {
    socket.emit("modify-todo", taskToSetComplete);
  }

  return (
    <div className="bg-gray-600">
      <AddTodo handlButtonPress={handleBtnPress} />
      <div className="border-2 border-red-500 p-4">
        {todoArray.map((todo, index) => {
          return (
            <h2 key={index}>
              <Todo todo={todo} toggleTaskState={handleTaskCompletion} />
            </h2>
          )
        })}
      </div>
    </div>
  );
}

export default App;
