import style from './Todo.module.css';
import Button from 'ui/Button/Button';
import { TodoState, TodosState } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/config/configStore';
import {
  __deleteTodo,
  __getTodos,
  __switchTodo,
} from '../../redux/modules/todosSlice';

export default function Todo({ todos }: { todos: TodosState }) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: TodoState['id']) => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(__deleteTodo(id));
      dispatch(__getTodos());
    }
  };
  const handleSwitch = (id: TodoState['id'], isDone: TodoState['isDone']) => {
    dispatch(__switchTodo({ id, isDone }));
    dispatch(__getTodos());
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
