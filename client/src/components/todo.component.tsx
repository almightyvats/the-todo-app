import { FC } from 'react';
import { ITask } from '../intefaces/task.interface'

type TodoProps = {
    todo: ITask;
    toggleTaskState(taskToSetComplete: string): void;
};

const Todo: FC<TodoProps> = ({ todo, toggleTaskState }) => {

    const showCompleted = () => {
        if (todo.taskCompleted) {
            return <span>Done!</span>
        } else {
            return <span>Not!</span>
        }
    }
    return (
        <>
            {todo.taskName}
            {showCompleted()}
            <button onClick={() => {
                toggleTaskState(todo.taskName)
            }}>X</button>
        </>
    );
};

export default Todo;