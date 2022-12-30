import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "../todoitem";
import { fetchTodos } from "../../redux/todoslice";
const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
