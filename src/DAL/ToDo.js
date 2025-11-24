import Todo from '../Models/Todo.js';

export async function getNameByIdDb(id) {
    return await Todo.findById(id);
}

export async function getAllDataDb() {
    return await Todo.find().sort({ createdAt: -1 });;
}