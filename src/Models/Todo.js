import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false }
}, { timestamps: true });
const ToDo= mongoose.model('Todo', todoSchema);

export default ToDo;
