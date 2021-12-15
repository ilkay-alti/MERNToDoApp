const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//! middlewareFunctions
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://ilkayus:123asd123@cluster0.7n3oe.mongodb.net/toDoApp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(console.error);

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todos/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});

app.delete("/todos/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndRemove(req.params.id);
  res.json({ result });
});

app.get("/todos/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  console.log(todo);
  if (todo === !null) {
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
  } else {
    console.log("cash2");
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
