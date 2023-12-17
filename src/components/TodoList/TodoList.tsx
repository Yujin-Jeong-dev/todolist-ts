import Todo from 'components/Todo/Todo';
import React, { useEffect } from 'react';
import style from './TodoList.module.css';
import { TodosState } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { __getTodos } from '../../redux/modules/todosSlice';
import { RootState, AppDispatch } from 'redux/config/configStore';

export default function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, todos } = useSelector(
    (state: RootState) => state.todos,
  );

  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  const incompletedTodos: TodosState = todos.filter(
    (todo) => todo.isDone === false,
  );
  const completedTodos: TodosState = todos.filter(
    (todo) => todo.isDone === true,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
