import { FC, useState } from 'react'

type AddTodoProps = {
    handlButtonPress(event: React.MouseEvent<HTMLElement>, todo: string): void;
};

const AddTodo: FC<AddTodoProps> = ({ handlButtonPress }) => {
    const [todo, setTodo] = useState<string>("");

    return (
        <div className="flex justify-center bg-gray-500 p-7">
            <div>
                <input
                    type="text"
                    className="border rounded py-2 px-3 text-grey-darkest"
                    placeholder="Add Todo here"
                    value={todo}
                    onChange={e => { setTodo(e.target.value) }}
                />
                <button
                    name="add-button"
                    className="ml-2 bg-blue-500 hover:bg-blue-700 
                    text-white font-bold py-2 px-4 rounded"
                    onClick={
                        event => { handlButtonPress(event, todo); setTodo(""); }}
                >Add Todo
            </button>
            </div>
        </div>
    )
}

export default AddTodo;
