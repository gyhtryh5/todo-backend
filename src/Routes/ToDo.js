import express from 'express';
import {
  getNameById,
  getAllDataSorted,
  createTodo,
  updateTodoBll,
  deleteTodoBll
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

router.get('/', async (req, res, next) => {
  try {
    res.json(await getAllDataSorted());
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newData = await createTodo(req.body);
    if (newData) {
      res.status(201).json({
        message: 'New Todo created successfully',
        newData: newData
      });
    }
  } catch (err) {
    next(err);
  }
});


router.put('/:id', async (req, res, next) => {
  try {
    const updatedData = await updateTodoBll(req.params.id, req.body);
    if (!updatedData) return res.status(404).json({
      error: 'Not found'
    });
    res.json(updatedData);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const removed = await deleteTodoBll(req.params.id);
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


// router.post('/', async (req, res, next) => {
//   try {
//     const todo = new Todo(req.body);
//     const saved = await todo.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     next(err);
//   }
// });



// router.get('/:id', async (req, res, next) => {
//   try {
//     const todo = await Todo.findById(req.params.id);
//     if (!todo) return res.status(404).json({
//       error: 'Not found'
//     });
//     res.json(todo);
//   } catch (err) {
//     next(err);
//   }
// });



// router.put('/:id', async (req, res, next) => {
//   try {
//     const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
//       new: true
//     });
//     if (!updated) return res.status(404).json({
//       error: 'Not found'
//     });
//     res.json(updated);
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const removed = await Todo.findByIdAndDelete(req.params.id);
//     if (!removed) return res.status(404).json({
//       error: 'Not found'
//     });
//     res.json({
//       message: 'Deleted',
//       id: removed._id
//     });
//   } catch (err) {
//     next(err);
//   }
// });

export default router;