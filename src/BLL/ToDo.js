import {
  getNameByIdDb,
  getAllDataDb,
  createTodoDb,
  updateTodoDb,
  deleteTodoDb
} from '../DAL/ToDo.js';


export async function getNameById(id) {
  try {
    let titleById = await getNameByIdDb(id);
    if (!titleById) {
      console.log("No title found for id: " + id);
    }
    return titleById.title.toUpperCase();
  } catch (err) {
    console.log(err)
  }
}

export async function getAllDataSorted() {
  try {
    const data = await getAllDataDb();
    if (!data) {
      console.log("No data found");
    }
    return data;
  } catch (err) {
    console.log(err)
  }
};

export async function createTodo(data) {

  try {
    const newTodo = await createTodoDb(data);
    return newTodo;
  } catch (err) {
    console.log(err)
  }
}

export async function updateTodoBll(id, data) {
  try {
    const updatedTodo = await updateTodoDb(id, data);
    return updatedTodo;
  } catch (err) {
    console.log(err)
  }
}


export async function deleteTodoBll(id){
  try {
    const deletedTodo = await deleteTodoDb(id);
    return deletedTodo;
  } catch (err) {
    console.log(err)
  }
}
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