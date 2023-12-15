import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/config/configStore';

//액션 타입 정의
interface TodosState {
  id: string;
  title: string;
  content: string;
  status: string;
}

const initialState: TodosState[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodosState>) => {
      state.push(action.payload);
      console.log(action.payload);
    },
  },
});

export default todosSlice.reducer;
export const { addTodo } = todosSlice.actions;
