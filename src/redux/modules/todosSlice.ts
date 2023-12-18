import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../axios/api';
import { TodoState } from '../../types/Todo';

export type Todos = {
  todos: TodoState[];
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
};
const initialState: Todos = {
  todos: [],
  isLoading: false,
  isError: false,
  error: undefined,
};

export const __getTodos = createAsyncThunk(
  'getTodos',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/todos`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __addTodo = createAsyncThunk(
  'addTodo',
  async (payload: TodoState, thunkAPI) => {
    try {
      await api.post(`/todos/`, payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __deleteTodo = createAsyncThunk(
  'deleteTodo',
  async (payload: TodoState['id'], thunkAPI) => {
    try {
      await api.delete(`/todos/${payload}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __switchTodo = createAsyncThunk(
  'switchTodo',
  async (
    payload: { id: TodoState['id']; isDone: TodoState['isDone'] },
    thunkAPI,
  ) => {
    try {
      const { id, isDone } = payload;
      await api.patch(`/todos/${id}`, { isDone: !isDone });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getTodos.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      __getTodos.fulfilled,
      (state, action: PayloadAction<TodoState[]>) => {
        state.isLoading = false;
        state.isError = false;
        state.todos = action.payload;
      },
    );
    builder.addCase(__getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action.payload, typeof action.payload);
      console.log(action.error);
      state.error = action.error.message;
    });
  },
});

export default todosSlice.reducer;
//export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
