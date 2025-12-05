import React, { useMemo, useState } from "react";
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
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import UpIcon from "@mui/icons-material/ArrowUpward";
import DownIcon from "@mui/icons-material/ArrowDownward";

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
  onEdit?: (todo: Todo) => void;
  onDeleteRequest?: (todo: Todo) => void;
  onToggleCompleted?: (todo: Todo) => void;
};

type SortField = "title" | "description" | null;
type SortOrder = "asc" | "desc" | null;

export default function Pratice({
  todos,
  onEdit,
  onDeleteRequest,
  onToggleCompleted,
}: PraticeProps) {
  // stable rows (use string ids)
  const rows = todos.map((t, i) => ({ ...t, id: t._id ?? t.id ?? String(i) }));

  // pagination state
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // sorting state
  const [sortBy, setSortBy] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // comparator helper
  function compareStr(a = "", b = "", order: "asc" | "desc") {
    const A = a.toLowerCase();
    const B = b.toLowerCase();
    if (A < B) return order === "asc" ? -1 : 1;
    if (A > B) return order === "asc" ? 1 : -1;
    return 0;
  }

  // memoized sortedRows — sorts full row objects so entire row moves
  const sortedRows = useMemo(() => {
    if (!sortBy || !sortOrder) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      if (sortBy === "title") return compareStr(a.title ?? "", b.title ?? "", sortOrder);
      return compareStr(a.description ?? "", b.description ?? "", sortOrder);
    });
    return copy;
  }, [rows, sortBy, sortOrder]);

  // visible slice for pagination
  const visibleRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // pagination handlers (typed)
  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // toggle sort: null -> asc -> desc -> null
  function handleSort(field: Exclude<SortField, null>) {
    if (sortBy !== field) {
      setSortBy(field);
      setSortOrder("asc");
      setPage(0);
      return;
    }
    if (sortOrder === "asc") setSortOrder("desc");
    else if (sortOrder === "desc") {
      setSortBy(null);
      setSortOrder(null);
    } else {
      setSortOrder("asc");
    }
    setPage(0);
  }

  // small UI arrow
  function SortArrow({ field }: { field: Exclude<SortField, null> }) {
    if (sortBy !== field || !sortOrder) return <UpIcon sx={{ opacity: 0.25 }} fontSize="small" />;
    return sortOrder === "asc" ? <UpIcon fontSize="small" /> : <DownIcon fontSize="small" />;
  }

  return (
    <Paper>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Done</StyledTableCell>

              <StyledTableCell
                align="left"
                sx={{ cursor: "pointer", userSelect: "none" }}
                onClick={() => handleSort("title")}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>Title</span>
                  <SortArrow field="title" />
                </Box>
              </StyledTableCell>

              <StyledTableCell
                align="left"
                sx={{ cursor: "pointer", userSelect: "none" }}
                onClick={() => handleSort("description")}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>Description</span>
                  <SortArrow field="description" />
                </Box>
              </StyledTableCell>

              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>
                  <Checkbox
                    checked={!!row.completed}
                    onChange={() => onToggleCompleted?.(row as Todo)}
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
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <IconButton onClick={() => onEdit?.(row as Todo)} size="large">
                      <UpdateIcon />
                    </IconButton>

                    <IconButton onClick={() => onDeleteRequest?.(row as Todo)} size="large">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={sortedRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Paper>
  );
}
