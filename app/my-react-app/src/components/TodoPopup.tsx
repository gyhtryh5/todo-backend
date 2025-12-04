// src/components/TodoPopup.tsx
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { Todo } from "../Api/todoApi";

type TodoPopupProps = {
  open: boolean;
  todo?: Todo | null;
  onClose: () => void;
  onSave: (data: { title: string; description?: string }) => Promise<void> | void;
  titleText?: string;
};

export default function TodoPopup({
  open,
  todo,
  onClose,
  onSave,
  titleText,
}: TodoPopupProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(todo?.title ?? "");
      setDescription(todo?.description ?? "");
    }
  }, [open, todo]);

  async function handleSave() {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    try {
      setSaving(true);
      await onSave({ title: title.trim(), description: description.trim() });
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{titleText ?? (todo ? "Edit Todo" : "Create Todo")}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
