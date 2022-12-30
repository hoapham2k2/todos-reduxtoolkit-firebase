import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, fetchAddTodos } from "../../redux/todoslice";
import { v4 as uuid } from "uuid";
const AddTodo = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleOnClick = () => {
    if (title === "") {
      alert("Please enter a title");
      return;
    }

    const newTodo = {
      // id: uuid(),
      title: title,
      isCompleted: false,
    };
    dispatch(fetchAddTodos(newTodo));
    setTitle("");
  };

  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      handleOnClick();
    }
  };
  return (
    <div className="flex ">
      <input
        type="text"
        name="input"
        id="input"
        className="flex-1 p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyUp={handleOnEnter}
      />
      <button className="p-2 bg-zinc-600" onClick={handleOnClick}>
        Add
      </button>
    </div>
  );
};

export default AddTodo;
