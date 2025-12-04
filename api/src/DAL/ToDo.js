import Todo from '../Models/Todo.js';

export async function getNameByIdDb(id) {
    return await Todo.findById(id);
}

export async function getAllDataDb() {
    return await Todo.find().sort({
        createdAt: -1
    });;
}

export async function createTodoDb(data) {
    const todo = new Todo(data);
    return await todo.save();
}

export async function updateTodoDb(id, data) { 
    return await Todo.findByIdAndUpdate(id,data,{ new: true })
}

export async function deleteTodoDb(id) {
    return await Todo.findByIdAndDelete(id);
}

