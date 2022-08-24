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

function StickyTable(props) {
  return (
    <Paper
      sx={{
        width: "100%",
        height: props.height,
        marginTop: "0.5rem",
        overflow: "auto",
      }}
    >
      <TableContainer sx={{ height: "97%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
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
            {props.rows.map((row, idx) => {
              console.log(props.query);
              return (
                props.query === undefined
                  ? true
                  : row.coaching
                      .toLowerCase()
                      .startsWith(props.query.toLowerCase())
              ) ? (
                <TableRow
                  hover
                  role="checkbox"
                  onClick={() => {
                    if (props.handleClick !== undefined) props.handleClick(idx);
                  }}
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
              ) : (
                <></>
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
  const handleClick = (index) => {
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
    <StickyTable
      columns={columns}
      rows={rows}
      handleClick={handleClick}
      query={props.query}
      height="86vh"
    />
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
      `${format(new Date(course.START_TIME.slice(0, -1)), "h:mm a")} - ${format(
        new Date(course.END_TIME.slice(0, -1)),
        "h:mm a"
      )}`
    )
  );
  return (
    <StickyTable
      columns={columns}
      rows={rows}
      query={props.query}
      height="86vh"
    />
  );
}

export function CoachingCoursesTable(props) {
  const columns = [
    { id: "class_no", label: "Class", align: "center" },
    {
      id: "subject",
      label: "Subject",
      align: "center",
    },
  ];
  function createData(class_no, subject) {
    return { class_no, subject };
  }
  const rows = props.list.map((course) =>
    createData(course.CLASS, course.SUBJECT)
  );
  return (
    <StickyTable
      columns={columns}
      rows={rows}
      query={props.query}
      height="35vh"
    />
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
      `${format(new Date(course.START_TIME.slice(0, -1)), "h:mm a")} - ${format(
        new Date(course.END_TIME.slice(0, -1)),
        "h:mm a"
      )}`,
      course.SEATS,
      course.STUDENT_COUNT
    )
  );
  return <StickyTable columns={columns} rows={rows} height="86vh" />;
}
