import { useState, useEffect, FC } from 'react';
import Todo from './components/todo.component';
import { ITask } from './intefaces/task.interface'

import io from "socket.io-client";
const socket = io("http://localhost:5000");

const App: FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todoArray, setTodoArray] = useState<ITask[]>([]);

  useEffect(() => {
    socket.emit("intial-todo-fetch");
    socket.on("todo-all-fetched", (payload: ITask[]) => {      
      setTodoArray(payload);
    });
    
  }, [todoArray]);

  const handleBtnPress = (event: React.MouseEvent<HTMLElement>) : void => {
    event.preventDefault();
    socket.emit("add-todo", todo);
    setTodo("");
  }
  
  useEffect(() => {
    socket.on("todo-added", (payload: ITask) => {
      setTodoArray([...todoArray, payload]);
    })
  }, [todoArray]);
  
  const handleTaskCompletion = (taskToSetComplete: string): void => {
    socket.emit("modify-todo", taskToSetComplete);
  }

  useEffect(() => {
    socket.on("todo-modified", (payload: ITask[]) => {
      setTodoArray(payload);
    })
  }, [todoArray]);

  return (
    <div>
      <header>
        <input
          type="text"
          placeholder="Add Todo here"
          value={todo}
          onChange={e => { setTodo(e.target.value) }}
        />
          <button
            onClick={
              event => handleBtnPress(event)}
          >Add Todo</button>
      <div className="h-screen flex justify-center items-center bg-gray-100">
          {todoArray.map((todo, index) => {
            return (
              <h2 key={index}>
                <Todo todo={todo} toggleTaskState={handleTaskCompletion}/>
              </h2>
            )
          })}
        </div>


      </header>
    </div>
  );
}

export default App;
