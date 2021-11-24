import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';

export const store = configureStore({
  reducer: {
    todoReducerFromStore: todoReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
