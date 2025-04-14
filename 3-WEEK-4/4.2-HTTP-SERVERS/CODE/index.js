import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// middleware
app.use(bodyParser.json());

// in memory todo

let todos = [];
let id = 1;

// routes

// get all todos

app.get('/todos', (req, res) => {
  res.send(todos);
});

// get a specific todo
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) return res.status(404).json({ error: 'todo not fount' });
  res.send(todo);
});

// create a todo
app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const newTodo = { id: id++, title, completed: false };
  todos.push(newTodo);
  res.send(201).json(newTodo);
});
// update a todo
app.put('/todos/:id', (req, res) => {
  const { title, completed } = req.body;
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'todo not found' });
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.send(200);
});
// splice(start, deleteCount, item1)
// delete the todo
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((t) => t.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: 'todo not found' });

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});
// start server

app.listen(port, () => {
  console.log('start the server');
});
