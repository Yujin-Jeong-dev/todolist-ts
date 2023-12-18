import Todo from 'components/Todo/Todo';
import style from './TodoList.module.css';
import { TodoState } from '../../types/Todo';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../../axios/todo';

export default function TodoList() {
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery<TodoState[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
    throwOnError: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const incompletedTodos = todos?.filter((todo) => todo.isDone === false);
  const completedTodos = todos?.filter((todo) => todo.isDone === true);

  return (
    <section>
      <h3>Working...🔥</h3>
      <ul className={style.ul}>
        {incompletedTodos && <Todo todos={incompletedTodos} />}
      </ul>
      <h3>Done!🥳</h3>
      <ul className={style.ul}>
        {completedTodos && <Todo todos={completedTodos} />}
      </ul>
    </section>
  );
}
