import { Button } from "@mui/material";


import { useState } from "react";

type InputProps = {
  onAddTodo: (data: { title: string; description: string }) => void | Promise<void>;
};

export default function Input({onAddTodo}: InputProps) {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    async function handleClick() {
    await onAddTodo({ title, description });
    setTitle("");
    setDescription("");
  }


  return (
       <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "8px" }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        
        <Button variant="contained" color="success" onClick={handleClick}> Add</Button>
      </div>
  );
}