import express from 'express';
import Todo from '../Models/Todo.js';

import {
  getNameById
} from '../BLL/ToDo.js';

const router = express.Router();

router.get('/getNameById/:id', async (req, res, next) => {
  try {
    const todo = await getNameById(req.params.id) //.getNameById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        error: 'Not found'
      });
    }
    res.json(todo);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const todo = new Todo(req.body);
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    res.json(await Todo.find().sort({
      createdAt: -1
    }));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({
      error: 'Not found'
    });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});



router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({
      error: 'Not found'
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const removed = await Todo.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({
      error: 'Not found'
    });
    res.json({
      message: 'Deleted',
      id: removed._id
    });
  } catch (err) {
    next(err);
  }
});

export default router;