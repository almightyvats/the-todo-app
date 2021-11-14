import { useState, useEffect }  from 'react';
import './App.css';

import io from "socket.io-client";
const socket = io("http://localhost:5000");

function App() {

  const [todo, setTodo] = useState<string>("");
  const [todoArray, setTodoArray] = useState<string[]>([]);

  const handleBtnPress = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();    
    socket.emit("msg", todo);
    setTodo("");
  }

  useEffect(() => {
    socket.on("todo-added", (payload) => {
    setTodoArray([...todoArray, payload]);
    })
    console.log(todoArray);
  }, [todoArray]);


  return (
    <div className="App">
      <header className="App-header">
        <div>
          {todoArray.map(todo => <h2>{todo}</h2>)}
      	</div>
        <input 
          type="text" 
          placeholder="Add Todo here"
          value={todo}
          onChange={e=>{setTodo(e.target.value)}}
        />

        <button
          onClick={event => handleBtnPress(event)}
        >Add Todo</button>
        
      </header>
    </div>
  );
}

export default App;
