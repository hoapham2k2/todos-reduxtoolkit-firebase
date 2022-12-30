import { useState } from "react";
import "./App.css";
import Todos from "./components/todos";
import AddTodo from "./components/addtodo";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  // useEffect(() => {
  //   const addTodo = async () => {
  //     const docRef = await addDoc(collection(db, "todos"), {
  //       title: "123123",
  //       isCompleted: false,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   };

  //   addTodo().catch((err) => {
  //     console.error("Error adding document: ", err);
  //   });
  // }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const querySnapshot = await getDocs(collection(db, "todos"));
  //     querySnapshot.forEach((doc) => {
  //       console.log(
  //         `${doc.id} => ${doc.data().title}=>${doc.data().isCompleted}`
  //       );
  //     });
  //   };

  //   getData().catch((err) => {
  //     console.error("Error getting data: ", err);
  //   });
  // }, []);

  // delete document jpB9GT9Y7OxBLKH1d1lf

  // useEffect(() => {
  //   const deleteTodo = async () => {
  //     const docRef = await deleteDoc(doc(db, "todos", "3O7YgcnoYcPIliVIMXpF"));
  //     console.log("Document deleted with ID: ", docRef.id);
  //   };

  //   deleteTodo().catch((err) => {
  //     console.error("Error deleting document: ", err);
  //   });
  // }, []);

  return (
    <div className="App min-w-100 min-h-screen bg-slate-800 flex justify-center items-center">
      <div className="w-96 h-[400px] bg-slate-500 border-2 flex flex-col justify-between">
        <Todos />
        <AddTodo />
      </div>
    </div>
  );
}

export default App;
