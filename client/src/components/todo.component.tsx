import { FC } from 'react';
import { ITask } from '../intefaces/task.interface'

type TodoProps = {
    todo: ITask
};

const Todo: FC<TodoProps> = ({ todo }) => {
    return (
        <>
            {todo.taskName}
        </>
    );
};

export default Todo;