import style from './Todo.module.css';
import Button from 'ui/Button/Button';
import { TodoState, TodosState } from 'types/Todo';
import api from '../../axios/api';

export default function Todo({ todos }: { todos: TodosState }) {
  const handleDelete = (id: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      api.delete(`/todos/${id}`);
    }
  };
  const handleSwitch = async (
    id: TodoState['id'],
    isDone: TodoState['isDone'],
  ) => {
    api.patch(`/todos/${id}`, {
      isDone: !isDone,
    });
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
