const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = req.body.todo;
  todos.push(todo);
  res.json({ message: 'Todo added', todos });
});

app.delete('/todos/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
    res.json({ message: 'Todo removed', todos });
  } else {
    res.status(400).json({ message: 'Invalid index' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
