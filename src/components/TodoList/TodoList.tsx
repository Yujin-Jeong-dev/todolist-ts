import Todo from 'components/Todo/Todo';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { TodosState } from 'types/Todo';
import style from './TodoList.module.css';

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos);
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
