import { useState, useEffect, FC } from 'react';
import './App.css';
import Todo from './components/todo.component';
import { ITask } from './intefaces/task.interface'

import io from "socket.io-client";
const socket = io("http://localhost:5000");

const App: FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todoArray, setTodoArray] = useState<ITask[]>([]);

  useEffect(() => {
    socket.on("todo-added", (payload) => {
      let newTask: ITask = { taskName: payload, taskCompleted: false};
      setTodoArray([...todoArray, newTask]);
    })
  }, [todoArray]);

  const handleBtnPress = (event: React.MouseEvent<HTMLElement>) : void => {
    event.preventDefault();
    socket.emit("msg", todo);
    setTodo("");
  }

  const handleTaskCompletion = (taskToSetComplete: string) => {

  }


  return (
    <div className="App">
      <header className="App-header">
        <div>
          {todoArray.map((todo, index) => {
            return (
              <h2 key={index}>
                <Todo todo={todo}/>
              </h2>
            )
          })}
        </div>
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

      </header>
    </div>
  );
}

export default App;
