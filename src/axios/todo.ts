import { TodoState } from '../types/Todo';
import api from './api';

export const getTodos = () => api.get(`/todos`).then((res) => res.data);

export const addTodo = (newTodo: TodoState) => api.post(`/todos`, newTodo);

export const deleteTodo = async (id: TodoState['id']) => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    return error;
  }
};

export const switchTodo = ({ id, isDone }: Pick<TodoState, 'id' | 'isDone'>) =>
  api.patch(`/todos/${id}`, { isDone: !isDone });
