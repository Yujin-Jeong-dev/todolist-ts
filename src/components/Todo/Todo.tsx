import { useDispatch } from 'react-redux';
import style from './Todo.module.css';
import Button from 'ui/Button/Button';
import { deleteTodo, switchTodo } from '../../redux/modules/todos';
import { TodosState } from 'types/Todo';

export default function Todo({ todos }: { todos: TodosState }) {
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(deleteTodo(id));
    }
  };
  const handleSwitch = (id: string) => {
    dispatch(switchTodo(id));
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
                <Button text="취소" onClick={() => handleSwitch(id)} />
              ) : (
                <Button text="완료" onClick={() => handleSwitch(id)} />
              )}
            </div>
          </li>
        );
      })}
    </>
  );
}
