import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoState, TodosState } from 'types/Todo';

const initialState: TodosState = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoState>) => {
      state.push(action.payload);
      console.log(action.payload);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    switchTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
