import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const API_BASE_URL = "http://localhost:5000";

  const getTodosData = () => {
    axios
      .get(API_BASE_URL + "/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE_URL + "/todos/complete/" + id).then(
      (res) => res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    console.log("asdasd  " + API_BASE_URL + "/todos/delete/" + id);
    const data = await fetch(API_BASE_URL + "/todos/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  const addTodo = async () => {
    const data = await fetch(API_BASE_URL + "/todos/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  };

  useEffect(() => {
    getTodosData();
    console.log(todos);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Welkcome, İlkay</h1>
        <h4>Your Task</h4>
      </div>
      <div className={todos}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={"todo" + (todo.complete ? " is-checked" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>

              <div className="text">{todo.text}</div>

              <div className="delete" onClick={() => deleteTodo(todo._id)}>
                x
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>
      <div className="addPopUp" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopUp" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        console.log("asd")
      )}
    </div>
  );
};

export default App;
