import React, { useState } from 'react';
import Button from 'ui/Button/Button';
import { v4 as uuid } from 'uuid';
import style from './AddTodo.module.css';
import api from '../../axios/api';
import { TodoState } from 'types/Todo';

type AddTodoForm = { title: string; content: string };

export default function AddTodo() {
  const [form, setForm] = useState<AddTodoForm>({ title: '', content: '' });
  const addTodo = async (newTodo: TodoState) => {
    api.post(`/todos`, newTodo);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ title: '', content: '' });
    if (!form.title.trim() || !form.content.trim()) return;
    const newTodo = { id: uuid(), ...form, isDone: false };
    addTodo(newTodo);
  };
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.div}>
        <input
          className={style.input}
          type="text"
          name="title"
          value={form.title}
          placeholder="제목"
          onChange={handleChange}
        />
        <input
          className={style.input}
          type="text"
          name="content"
          value={form.content}
          placeholder="내용"
          onChange={handleChange}
        />
      </div>
      <Button text={'추가'} />
    </form>
  );
}
