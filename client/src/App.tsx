import { useEffect, FC } from 'react';
import Todo from './components/todo.component';
import { useAppSelector, useAppDispatch } from './app/hooks';

import AddTodo from './components/addTodo.component';
import {
  loadTodos, addTodo, modifyTodo,
  selectTodos
} from './features/todos/todoSlice';


const App: FC = () => {

  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleBtnPress = (event: React.MouseEvent<HTMLElement>, todo: string): void => {
    event.preventDefault();
    dispatch(addTodo(todo));
  }

  const handleTaskCompletion = (taskToSetComplete: string): void => {
    dispatch(modifyTodo(taskToSetComplete));
  }

  return (
    <div className="bg-gray-600">
      <AddTodo handlButtonPress={handleBtnPress} />
      <div className="border-2 border-red-500 p-4">
        {todos.map((todo, index) => {
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
