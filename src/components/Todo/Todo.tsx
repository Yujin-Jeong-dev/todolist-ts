import style from './Todo.module.css';
import Button from 'ui/Button/Button';
import { TodoState } from '../../types/Todo';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteTodo, switchTodo } from './../../axios/todo';

export default function Todo({ todos }: { todos: TodoState[] }) {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleDelete = (id: TodoState['id']) => {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteTodoMutation.mutate(id);
    }
  };

  const switchTodoMutation = useMutation({
    mutationFn: switchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  const handleSwitch = (id: TodoState['id'], isDone: TodoState['isDone']) => {
    switchTodoMutation.mutate({ id, isDone });
  };

  return (
    <>
      {todos.map((todo) => {
        const { id, title, content, isDone } = todo;
        return (
          <li className={style.li} key={id}>
            <div className={style.todo}>
              <h3 className={style.h3}>{title}</h3>
              <p>{content}</p>
            </div>
            <div className={style.button}>
              <Button text="삭제" onClick={() => handleDelete(id)} />
              {isDone ? (
                <Button text="취소" onClick={() => handleSwitch(id, isDone)} />
              ) : (
                <Button text="완료" onClick={() => handleSwitch(id, isDone)} />
              )}
            </div>
          </li>
        );
      })}
    </>
  );
}
