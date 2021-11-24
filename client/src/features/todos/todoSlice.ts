import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../intefaces/task.interface'
import { RootState } from '../../app/store';
import socket from '../../app/socket';

export interface TodoState {
    todos: ITask[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
const initialState: TodoState = {
    todos: [],
    status: 'idle'
};

export const loadTodos = createAsyncThunk(
    'todos/loadTodos',
    () => {
        socket.emit("intial-todo-fetch");
        return new Promise<ITask[]>((resolve, reject) => {
            socket.once("todo-all-fetched", (_payload) => {
                resolve(_payload);
            });
        });
    }
);

export const modifyTodo = createAsyncThunk(
    'todos/modifyTodo',
    (taskToSetComplete: string) => {
        socket.emit("modify-todo", taskToSetComplete);
        return new Promise<ITask[]>((resolve, reject) => {
            socket.once("todo-modified", (_payload) => {
                resolve(_payload);
            })
        });
    }
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    (todo: string) => {
        socket.emit("add-todo", todo);
        return new Promise<ITask>((resolve, reject) => {
            socket.once("todo-added", (_payload) => {
                resolve(_payload);
            })
        });
    }
);

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loadTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(loadTodos.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(modifyTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos.push(action.payload);
            })
    }
});

export const selectTodos = (state: RootState) => state.todoReducerFromStore.todos;
export default todoSlice.reducer;