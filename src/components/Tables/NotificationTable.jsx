import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import "./Tables.scss";
const cookies = new Cookies();

const NotificationTable = (props) => {
  const columns = [
    { id: "notification", label: "Notification", align: "center" },
  ];
  function createData(notification) {
    return { notification };
  }
  const navigate = useNavigate();
  const type = cookies.get("type");
  const handleClick = (index) => {
    if (type === "TUTOR") {
      navigate(props.list[index].URL);
    }
  };
  const rows = props.list.map((notification) => createData(notification.TEXT));

  return (
    <Paper
      sx={{
        width: "100%",
        height: "86vh",
        marginTop: "0.5rem",
        overflow: "auto",
      }}
    >
      <TableContainer sx={{ height: "97%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {rows.map((row, idx) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  onClick={() => {
                    handleClick(idx);
                  }}
                  tabIndex={-1}
                  key={row.URL}
                  sx={{ cursor: "pointer" }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ fontSize: "1.1rem" }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default NotificationTable;
