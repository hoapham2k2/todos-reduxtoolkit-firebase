import React from "react";
import {
  deleteTodo,
  fetchRemoveTodos,
  fetchSwitchCompletedTodos,
  setCompleted,
} from "../../redux/todoslice";
import { useDispatch } from "react-redux";
const TodoItem = (props) => {
  const dispatch = useDispatch();

  const handleOnDelete = () => {
    dispatch(fetchRemoveTodos(props.todo.id));
    console.log("Deleting todo: " + props.todo.id);
  };
  return (
    <div className="flex items-center gap-5">
      <input
        className=""
        type="checkbox"
        id={props.todo.id}
        checked={props.todo.isCompleted}
        onChange={() => {
          dispatch(fetchSwitchCompletedTodos(props.todo.id));
        }}
      />
      <label
        className={
          props.todo.isCompleted === false
            ? "flex-auto "
            : "flex-auto line-through"
        }
        htmlFor={props.todo.id}
      >
        {props.todo?.title}
      </label>
      <button
        className="bg-red-400 border-2 border-black p-2"
        onClick={handleOnDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
