import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { Button } from "@mui/material";
import GlobalContext from "../store/GlobalContext";
import { format } from "date-fns";
const cookies = new Cookies();

// [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Bangladesh", "BD", 210147125, 8515767),
//   createData("Brazil", "BR", 210147125, 8515767),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

function StickyTable(props) {
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        marginTop: "0.5rem",
      }}
    >
      <TableContainer sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "yellow" }}>
              {props.columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "linear-gradient(#1a4870, #16344e);",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, idx) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  onClick={() => props.handleClick(idx)}
                  tabIndex={-1}
                  key={row.class}
                  sx={{ cursor: "pointer" }}
                >
                  {props.columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
}
export function TutorCoursesTable(props) {
  const columns = [
    { id: "coaching", label: "Coaching", align: "center" },
    { id: "class_no", label: "Class", align: "center" },
    {
      id: "subject",
      label: "Subject",
      align: "center",
    },
    {
      id: "students",
      label: "Total Students",
      align: "center",
    },
    {
      id: "batches",
      label: "Total Batches",
      align: "center",
    },
  ];
  function createData(coaching, class_no, subject, students, batches) {
    return { coaching, class_no, subject, students, batches };
  }
  const navigate = useNavigate();
  const type = cookies.get("type");
  const [course, setCourse] = useState(-1);
  const globalCtx = useContext(GlobalContext);
  const handleClick = (index) => {
    console.log("Clicked", index);
    if (type === "TUTOR") {
      navigate({
        pathname: "/my_courses/batches",
        search: createSearchParams({
          course_id: props.list[index].COURSE_ID,
        }).toString(),
      });
    }
  };
  const rows = props.list.map((course) =>
    createData(
      course.COACHING_NAME,
      course.CLASS,
      course.SUBJECT,
      course.STUDENT_COUNT,
      course.BATCH_COUNT
    )
  );
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        marginTop: "0.5rem",
      }}
    >
      <TableContainer sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "yellow" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "linear-gradient(#1a4870, #16344e)",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  onClick={() => handleClick(idx)}
                  tabIndex={-1}
                  key={row.class}
                  sx={{ cursor: "pointer" }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
}

export function StudentCoursesTable(props) {
  const columns = [
    { id: "coaching", label: "Coaching", align: "center" },
    { id: "class_no", label: "Class", align: "center" },
    {
      id: "subject",
      label: "Subject",
      align: "center",
    },
    {
      id: "start_date",
      label: "Starting Date",
      align: "center",
    },
    {
      id: "days",
      label: "Class Days",
      align: "center",
    },
    {
      id: "time",
      label: "Class Time",
      align: "center",
    },
  ];
  function createData(coaching, class_no, subject, start_date, days, time) {
    return { coaching, class_no, subject, start_date, days, time };
  }
  const rows = props.list.map((course) =>
    createData(
      course.COACHING_NAME,
      course.CLASS,
      course.SUBJECT,
      format(new Date(course.START_DATE), "do MMMM, yyyy"),
      course.CLASS_DAYS,
      course.CLASS_TIME
    )
  );
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        marginTop: ".5rem",
      }}
    >
      <TableContainer sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "linear-gradient(#1a4870, #16344e)",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.class}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
}

export function BatchesTable(props) {
  const columns = [
    { id: "batch_no", label: "Batch No", align: "center" },
    { id: "start_date", label: "Starting Date", align: "center" },
    {
      id: "days",
      label: "Class Days",
      align: "center",
    },
    {
      id: "time",
      label: "Class Time",
      align: "center",
    },
    { id: "students", label: "Total students", align: "center" },
    { id: "seats", label: "Total seats", align: "center" },
  ];
  function createData(batch_no, start_date, days, time, seats, students) {
    return { batch_no, start_date, days, time, seats, students };
  }
  const rows = props.list.map((course, idx) =>
    createData(
      idx + 1,
      format(new Date(course.START_DATE), "do MMMM, yyyy"),
      course.CLASS_DAYS,
      course.CLASS_TIME,
      course.SEATS,
      course.STUDENT_COUNT
    )
  );
  console.log("=>", rows);
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        marginTop: "0.5rem",
      }}
    >
      <TableContainer sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "linear-gradient(#1a4870, #16344e)",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.class}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
}
