
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Todo } from "../Api/todoApi.tsx";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
    fontWeight: 700,
    backgroundColor: "#f5f5f7",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    padding: "12px 16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "12px 16px",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fafafa",
  },
  "&:hover": {
    backgroundColor: "#f0f0f0",
    transition: "background-color 0.18s ease-in-out",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type PraticeProps = {
  todos: Todo[];
  onEdit?: (todo: Todo) => void;               // parent opens popup for update
  onDeleteRequest?: (todo: Todo) => void;      // parent opens confirm dialog
  onToggleCompleted?: (todo: Todo) => void;    // parent toggles completed via updateTodo
};

export default function Pratice({
  todos,
  onEdit,
  onDeleteRequest,
  onToggleCompleted,
}: PraticeProps) {
  const rows = todos.map((todo, index) => ({
    ...todo,
    id: todo._id ?? todo.id ?? String(index),
  }));

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Done</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>
                <Checkbox
                  checked={!!row.completed}
                  onChange={() => onToggleCompleted?.(row)}
                  inputProps={{ "aria-label": "toggle completed" }}
                />
              </StyledTableCell>

              <StyledTableCell
                align="left"
                sx={{
                  textDecoration: row.completed ? "line-through" : "none",
                  opacity: row.completed ? 0.6 : 1,
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 260,
                }}
                title={row.title}
              >
                {row.title}
              </StyledTableCell>

              <StyledTableCell
                align="left"
                sx={{
                  textDecoration: row.completed ? "line-through" : "none",
                  opacity: row.completed ? 0.6 : 1,
                  transition: "all 0.15s",
                  maxWidth: 360,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={row.description}
              >
                {row.description}
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton
                  aria-label="edit"
                  onClick={() => onEdit?.(row)}
                  size="large"
                >
                  <UpdateIcon />
                </IconButton>
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteRequest?.(row)}
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
