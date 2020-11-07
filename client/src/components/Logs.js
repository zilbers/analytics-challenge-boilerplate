// import InfiniteScroll from "react-infinite-scroll-component";
// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { Event } from "../models/event";

// const style = {
//   height: 30,
//   border: "1px solid green",
//   margin: 6,
//   padding: 8,
// };

// // function LogsScroll(): any {
// function LogsScroll() {
//   // const [logs, setLogs] = useState<[] | Event[]>([]);
//   // const [page, setPage] = useState<number>(0);
//   const [logs, setLogs] = useState([]);
//   const [page, setPage] = useState(0);
//   // const [loading, setLoading] = useState<boolean>(false);

//   const fetchMoreData = () => {
//     console.log("searched");
//     axios.get(`/events/logs/${page}`).then((res) => {
//       setLogs([...logs, ...res.data]);
//       setPage(page + 1);
//     });
//   };

//   return (
//     <div>
//       <InfiniteScroll
//         dataLength={logs.length}
//         next={fetchMoreData}
//         hasMore={true}
//         loader={<h4>Loading...</h4>}
//       >
//         {logs.map((i, index) => (
//           <div style={style} key={index}>
//             div - #{index}
//           </div>
//         ))}
//       </InfiniteScroll>
//     </div>
//     // <InfiniteScroll
//     //   dataLength={logs.length} //This is important field to render the next data
//     //   next={getLogs}
//     //   hasMore={true}
//     //   loader={<h4>Loading...</h4>}
//     //   endMessage={
//     //     <p style={{ textAlign: "center" }}>
//     //       <b>Yay! You have seen it all</b>
//     //     </p>
//     //   }
//     //   // // below props only if you need pull down functionality
//     //   // refreshFunction={refresh}
//     //   // pullDownToRefresh
//     //   // pullDownToRefreshThreshold={50}
//     //   // pullDownToRefreshContent={
//     //   //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
//     //   // }
//     //   // releaseToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>}
//     // >
//     //   {/* {
//     //     //@ts-ignore
//     //     logs.map((i: any, index: any) => (
//     //       <div style={style} key={index}>
//     //         div - #{index}
//     //       </div>
//     //     ))
//     //   } */}
//     //   {logs.map((i, index) => {
//     //     return (
//     //       <div style={style} key={index}>
//     //         div - #{index}
//     //       </div>
//     //     );
//     //   })}
//     // </InfiniteScroll>
//   );
// }

// // class LogsScroll extends React.Component {
// //   state = {
// //     logs: [],
// //     page: 0,
// //   };

// //   fetchMoreData = () => {
// //     console.log("searched");
// //     axios.get(`/events/logs/${this.state.page}`).then((res) => {
// //       this.setState({ logs: [...this.state.logs, ...res.data], page: this.state.page + 1 });
// //     });
// //   };

// //   render() {
// //     return (
// //       <InfiniteScroll
// //         dataLength={this.state.logs.length}
// //         next={this.fetchMoreData}
// //         hasMore={true}
// //         loader={<h4>Loading...</h4>}
// //       >
// //         {this.state.logs.map((i, index) => (
// //           <div style={style} key={index}>
// //             div - #{index}
// //           </div>
// //         ))}
// //       </InfiniteScroll>
// //     );
// //   }
// // }

// export default LogsScroll;

// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   const classes = useStyles();

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.name}>
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

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
  table: {
    minWidth: 650,
  },
});

const Container = styled.div`
  overflow: scroll;
  height: 250px;
  width: 100%;
  /* @media (max-width: 750px) {
    width: 100%;
  }

  @media (min-width: 750px) {
    width: 70%;
  }

  @media (min-width: 900px) {
    width: 40%;
  }

  @media (min-width: 1600px) {
    width: 600px;
  } */
`;

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
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">os</TableCell>
                <TableCell align="left">browser</TableCell>
              </TableRow>
            </TableHead>
            {logs.map((log, index) => {
              if (logs.length === index + 1) {
                return (
                  <div ref={lastLogElementRef} key={log}>
                    {index}
                  </div>
                );
              } else {
                return <div key={log}>{index}</div>;
              }
            })}
          </Table>
        </TableContainer>
      </Container>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
}
