
import express from 'express';
import { connectToMongoDB } from './src/Services/MongoDbConnection.js';
import todosRouter from './src/routes/ToDo.js';
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
app.use(express.json());
connectToMongoDB(MONGO_URI);

// Routes
app.use('/api/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
