import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos);
  return (
    <section>
      {/* <h3>Working...🔥</h3> */}
      <h3>TodoList</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            {todo.content}
          </li>
        ))}
      </ul>
    </section>
  );
}
