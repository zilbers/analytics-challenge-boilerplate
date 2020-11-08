import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled, { css } from "styled-components";
import DatePicker from "./DatePicker";

const Container = styled.div`
  height: 30%;
  max-width: 100%;
  flex-grow: 1;
`;

const backGroundCellColor = (val: number) => {
  switch (true) {
    case 0 <= val && val < 40:
      return "red";
    case 40 <= val && val < 70:
      return "orange";
    case 70 <= val && val < 85:
      return "yellow";
    case 85 <= val && val < 100:
      return "blue";
    default:
      return "green";
  }
};

const monthName = function (dt: Date) {
  const mlist = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return mlist[dt.getMonth()];
};

const formatDate = (dt: Date) =>
  `${monthName(new Date(dt))} ${new Date(dt).getDate()} ${new Date(dt).getFullYear()}`;

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

export default function BasicTable() {
  const classes = useStyles();

  const [retentionData, setRetentionData] = useState<any[] | undefined>(undefined);
  const [date, setDate] = useState<number>(() => new Date(new Date().toDateString()).getTime());

  async function getAndSet(url: string, setter: Function) {
    const { data } = await axios.get(url);
    const retention: any[] = data;
    if (retention[0] && retention[0].start) {
      retention.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    }
    setter(retention);
    console.log(retention);
  }

  useEffect(() => {
    getAndSet(`${"/events/retention?dayZero="}${date}`, setRetentionData);
  }, [date]);

  return (
    <Container>
      <DatePicker date={date} setDate={setDate} />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: "170px" }}>Date</TableCell>
              <TableCell> ew Users</TableCell>
              {retentionData &&
                retentionData.map((item, index) => <TableCell>week {index}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {retentionData &&
              retentionData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {formatDate(row.start)} - {formatDate(row.end)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.newUsers}
                  </TableCell>
                  {row.weeklyRetention.map((week: number, index: number) => (
                    <TableCell
                      align="left"
                      key={index}
                      style={{
                        backgroundColor: backGroundCellColor(week),
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {week ? week : 0}%
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
