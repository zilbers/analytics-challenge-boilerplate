import React, { useState, useRef, useCallback } from "react";
import useLogsSearch from "./useLogsSearch";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DatePicker from "./DatePicker";

const useStyles = makeStyles({
  container: {
    maxHeight: 250,
  },
  root: {
    flexGgrow: 2,
  },
});

const columns: { id: string; label: string; minWidth: number }[] = [
  { id: "name", label: "Session ID", minWidth: 170 },
  { id: "Type", label: "Type", minWidth: 100 },
  {
    id: "os",
    label: "OS",
    minWidth: 90,
  },
  {
    id: "browser",
    label: "Browser",
    minWidth: 100,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 120,
  },
];
const formatDate = (dateObj: Date) =>
  `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;

export default function App() {
  const [pageNumber, setPageNumber] = useState(0);

  const {
    logs,
    hasMore,
    loading,
    error,
  }: { logs: any[]; hasMore: boolean; loading: boolean; error: boolean } = useLogsSearch(
    pageNumber
  );
  const classes = useStyles();

  const observer = useRef();
  const lastLogElementRef = useCallback(
    (node) => {
      if (loading) return;
      //@ts-ignore
      if (observer.current) observer.current.disconnect();
      //@ts-ignore
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      //@ts-ignore
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) =>
                logs.length === index + 1 ? (
                  <TableRow ref={lastLogElementRef} key={log}>
                    <TableCell>{log.session_id}</TableCell>
                    <TableCell>{log.name}</TableCell>
                    <TableCell>{log.os}</TableCell>
                    <TableCell>{log.browser}</TableCell>
                    <TableCell>{formatDate(new Date(log.date))}</TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={log}>
                    <TableCell>{log.session_id}</TableCell>
                    <TableCell>{log.name}</TableCell>
                    <TableCell>{log.os}</TableCell>
                    <TableCell>{log.browser}</TableCell>
                    <TableCell>{formatDate(new Date(log.date))}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
}
