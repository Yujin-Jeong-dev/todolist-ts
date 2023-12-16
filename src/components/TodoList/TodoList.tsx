import Todo from 'components/Todo/Todo';
import React, { useEffect, useState } from 'react';
import api from '../../axios/api';
import { TodosState } from 'types/Todo';
import style from './TodoList.module.css';

export default function TodoList() {
  const [todos, setTodos] = useState<TodosState>([]);
  const getTodos = async () => {
    const response = await api.get(`/todos`);
    setTodos(response.data);
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  const incompletedTodos: TodosState = todos.filter(
    (todo) => todo.isDone === false,
  );
  const completedTodos: TodosState = todos.filter(
    (todo) => todo.isDone === true,
  );

  return (
    <section>
      <h3>Working...🔥</h3>
      <ul className={style.ul}>
        <Todo todos={incompletedTodos} />
      </ul>
      <h3>Done!🥳</h3>
      <ul className={style.ul}>
        <Todo todos={completedTodos} />
      </ul>
    </section>
  );
}
