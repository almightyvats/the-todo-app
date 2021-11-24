import { FC } from 'react';
import { ITask } from '../intefaces/task.interface'

type TodoProps = {
    todo: ITask;
    toggleTaskState(taskToSetComplete: string): void;
};

const Todo: FC<TodoProps> = ({ todo, toggleTaskState }) => {

    const showCompleteButton = () => {
        if (!todo.taskCompleted) {
           return <svg className="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
        } else {
            return <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="9 11 12 14 22 4" />  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
        }
    }

    const showCompleted = () => {
        if (todo.taskCompleted) {
            return <span>Done!</span>
        } else {
            return <span>Click the box after completion</span>
        }
    }
    return (
        <div className="m-2 p-5 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div className="flex-shrink-0">
                <button onClick={() => {
                    toggleTaskState(todo.taskName)
                }}>
                    {showCompleteButton()}
                </button>
            </div>
            <div>
                <div className="text-xl font-medium text-black">{todo.taskName}</div>
                <p className="text-gray-500">{showCompleted()}</p>
            </div>
        </div>
    );
};

export default Todo;