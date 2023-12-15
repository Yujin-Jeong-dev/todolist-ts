import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'ui/Button';
import { v4 as uuid } from 'uuid';
import { addTodo } from '../../redux/modules/todos';
//'redux/modules/todos';

type AddTodoForm = { title: string; content: string };

export default function AddTodo() {
  const [form, setForm] = useState<AddTodoForm>({ title: '', content: '' });
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ title: '', content: '' });
    if (!form.title.trim() || !form.content.trim()) return;
    const newTodo = { id: uuid(), ...form, status: 'active' };
    dispatch(addTodo(newTodo));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={form.title}
        placeholder="제목"
        onChange={handleChange}
      />
      <input
        type="text"
        name="content"
        value={form.content}
        placeholder="내용"
        onChange={handleChange}
      />
      <Button text={'추가하기'} />
    </form>
  );
}
