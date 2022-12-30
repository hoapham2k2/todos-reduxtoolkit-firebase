import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const myArray = [];
  querySnapshot.forEach((doc) => {
    myArray.push({
      id: doc.id,
      title: doc.data().title,
      isCompleted: doc.data().isCompleted,
    });
  });
  return myArray;
});

export const fetchAddTodos = createAsyncThunk(
  "todos/fetchAddTodos",
  async (newTodo) => {
    const docRef = await addDoc(collection(db, "todos"), newTodo);
    console.log("Document written with ID: ", docRef.id);

    const myTodo = {
      id: docRef.id,
      title: newTodo.title,
      isCompleted: newTodo.isCompleted,
    };
    return myTodo;
  }
);

export const fetchRemoveTodos = createAsyncThunk(
  "todos/fetchRemoveTodos",
  async (id) => {
    console.log("the id", id);
    const docRef = deleteDoc(doc(db, "todos", id))
      .then(() => {
        console.log("Document deleted with ID: ", id);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    return id;
  }
);

export const fetchSwitchCompletedTodos = createAsyncThunk(
  "todos/fetchSwitchCompletedTodos",
  async (id) => {
    const docRef = doc(db, "todos", id);
    const docSnap = await getDoc(docRef);
    console.log("the docSnap", docSnap.data());

    setDoc(docRef, {
      isCompleted: !docSnap.data().isCompleted,
      title: docSnap.data().title,
    });
    return id;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    status: "idle",
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const currentTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (currentTodo) {
        state.todos.splice(state.todos.indexOf(currentTodo), 1);
      }
    },
    setCompleted: (state, action) => {
      const currentTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (currentTodo) {
        currentTodo.isCompleted = !currentTodo.isCompleted;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(fetchAddTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(fetchRemoveTodos.fulfilled, (state, action) => {
        console.log("action payload", action);
        // state.todos.splice(state.todos.indexOf(action.payload), 1);
        const currentTodo = state.todos.find(
          (todo) => todo.id === action.payload
        );
        if (currentTodo) {
          state.todos.splice(state.todos.indexOf(currentTodo), 1);
        }
      })
      .addCase(fetchSwitchCompletedTodos.fulfilled, (state, action) => {
        const currentTodo = state.todos.find(
          (todo) => todo.id === action.payload
        );
        if (currentTodo) {
          currentTodo.isCompleted = !currentTodo.isCompleted;
        }
      });
  },
});

// redux thunk

export const { addTodo, deleteTodo, setCompleted } = todoSlice.actions;
export default todoSlice.reducer;
