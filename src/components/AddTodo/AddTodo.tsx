import React, { useState } from 'react';
import Button from 'ui/Button/Button';
import { v4 as uuid } from 'uuid';
import style from './AddTodo.module.css';
import { addTodo } from '../../axios/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AddTodoForm = { title: string; content: string };

export default function AddTodo() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<AddTodoForm>({ title: '', content: '' });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ title: '', content: '' });
    if (!form.title.trim() || !form.content.trim()) return;
    const newTodo = { id: uuid(), ...form, isDone: false };
    addTodoMutation.mutate(newTodo);
    //handleAdd(newTodo);
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
