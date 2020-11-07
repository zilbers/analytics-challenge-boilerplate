// /* eslint-disable */
// import InfiniteScroll from "react-infinite-scroller";
// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { getEffectiveTypeParameterDeclarations, setTextRange } from "typescript";
// import { Event } from "../models/event";

// function LogsScroll(): any {
//   const [logs, setLogs] = useState<[] | Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   function getLogs(page: number | string) {
//     setLoading(true);
//     axios.get(`/events/logs/${page}`).then((res) => {
//       setLogs([...logs, ...res.data]);
//       setLoading(false);
//     });
//   }

//   return logs[0] ? (
//     <InfiniteScroll
//       pageStart={0}
//       loadMore={getLogs}
//       hasMore={true || false}
//       loader={
//         <div className="loader" key={0}>
//           Loading ...
//         </div>
//       }
//     >
//       {/* {logs} */}
//     </InfiniteScroll>
//   ) : (
//     <div className="loader" key={0}>
//       Loading ...
//     </div>
//   );
// }

// export default LogsScroll;

import React, { useEffect, useState, useContext } from "react";
export default function () {
  return <div></div>;
}
