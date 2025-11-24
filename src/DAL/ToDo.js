import Todo from '../Models/Todo.js';

export async function getNameByIdDb(id) {
    return await Todo.findById(id);
}