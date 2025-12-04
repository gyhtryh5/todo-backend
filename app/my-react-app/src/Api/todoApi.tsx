const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function getTodos(){
    const res = await fetch(`${BASE}/todos`);
    if(!res.ok){
        throw new Error('Failed to fetch todos');
    }
     return res.json();
}

export interface Todo {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
}


export async function createTodo(todo: Todo){
    const res = await fetch(`${BASE}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if(!res.ok){
        throw new Error('Failed to create todo');
    }
    return res.json();
}

export async function updateTodo(id: string, todo: Partial<Todo>){
    const res = await fetch(`${BASE}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if(!res.ok){
        throw new Error('Failed to update todo');
    }
    return res.json();
}

// <-- This must exist and be exported
export async function deleteTodo(id: string) {
  const res = await fetch(`${BASE}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
  return res.json();
}