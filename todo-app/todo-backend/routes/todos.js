const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* GET statistics */
router.get('/statistics', async (req, res) => {
  const addedTodos = await redis.getAsync('added_todos') || 0
  res.send({ added_todos: parseInt(addedTodos, 10) });
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  
  /* Trying initializing redis with already added todos in db 
     const todosInDb = await Todo.find({})
     await redis.setAsync('added_todos', todosInDb.length) */

  let addedTodos = await redis.getAsync('added_todos');

  if(!addedTodos) {
    await redis.setAsync('added_todos', 1)
  } else {
    await redis.setAsync('added_todos', Number(addedTodos) + 1)
  }

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/:id?', async (req, res) => {
  const todo = await req.todo
  res.send(todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  req.todo.text = text || req.todo.text;
  req.todo.done = done || req.todo.done;
  await req.todo.save();
  res.send(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;