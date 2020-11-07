import React, { useState, useRef, useCallback } from "react";
import useLogsSearch from "./useLogsSearch";
import styled, { css } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  container: {
    maxHeight: 250,
  },
});

const columns = [
  { id: "name", label: "Session ID", minWidth: 170 },
  { id: "Type", label: "Type", minWidth: 100 },
  {
    id: "os",
    label: "os",
    minWidth: 170,
  },
  {
    id: "browser",
    label: "Browser",
    minWidth: 170,
  },
];

export default function App() {
  const [pageNumber, setPageNumber] = useState(0);

  const { logs, hasMore, loading, error } = useLogsSearch(pageNumber);
  const classes = useStyles();

  const observer = useRef();
  const lastLogElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
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
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
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
                  </TableRow>
                ) : (
                  <TableRow key={log}>
                    <TableCell>{log.session_id}</TableCell>
                    <TableCell>{log.name}</TableCell>
                    <TableCell>{log.os}</TableCell>
                    <TableCell>{log.browser}</TableCell>
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
