// src/App.tsx
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import Pratice from "./components/pratice";
import TodoPopup from "./components/TodoPopup";       // <- make sure file exists
import ConfirmDialog from "./components/ConfirmDialog"; // <- make sure file exists
import AddIcon from '@mui/icons-material/Add';

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  type Todo,
} from "./Api/todoApi.tsx";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  function openCreate() {
    setSelectedTodo(null);
    setPopupOpen(true);
  }

  function openEdit(todo: Todo) {
    setSelectedTodo(todo);
    setPopupOpen(true);
  }


async function handleSave(data: { title: string; description?: string }) {
  try {
    if (selectedTodo && selectedTodo._id) {
      const updated = await updateTodo(selectedTodo._id, {
        title: data.title,
        description: data.description,
      });
      setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } else {
      // create then re-fetch full list so UI is consistent
      await createTodo({
        title: data.title,
        description: data.description,
        completed: false,
      } as Todo);

      // re-sync from server
      await fetchTodos();
    }
  } catch (err) {
    console.error("Save failed:", err);
    throw err;
  }
}  

  function requestDelete(todo: Todo) {
    setTodoToDelete(todo);
    setConfirmOpen(true);
  }

  async function handleDelete() {
    if (!todoToDelete?._id) return;
    try {
      await deleteTodo(todoToDelete._id);
      setTodos((prev) => prev.filter((t) => t._id !== todoToDelete._id));
      setTodoToDelete(null);
      setConfirmOpen(false);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  }

async function toggleCompleted(todo: Todo) {
  if (!todo._id) return;
  try {
    const updated = await updateTodo(todo._id, { completed: !todo.completed });
    setTodos(prev => prev.map(t => (t._id === updated._id ? updated : t)));
  } catch (err) {
    console.error("Toggle failed:", err);
    // Optionally show an alert/snackbar
  }
}
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <h1>ToDo 
          <button onClick={openCreate}> <AddIcon/> </button>
        </h1>

        

        <Pratice todos={todos} onEdit={openEdit} onDeleteRequest={requestDelete} onToggleCompleted={toggleCompleted} />

        <TodoPopup
          open={popupOpen}
          todo={selectedTodo}
          onClose={() => setPopupOpen(false)}
          onSave={handleSave}
        />

        <ConfirmDialog
          open={confirmOpen}
          title="Delete todo?"
          description={`Are you sure you want to delete "${todoToDelete?.title}"?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
      </Container>
    </>
  );
}
