import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch(pageNumber: number, query: string, sorting: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [logs, setLogs] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLogs([]);
  }, [query, sorting]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: "GET",
      url: `/events/logs/${pageNumber}`,
      params: { search: query, sorting },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        //@ts-ignore
        setLogs((prevLogs: any) => {
          return [...prevLogs, ...res.data];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber, sorting]);
  // }, [pageNumber]);

  return { loading, error, logs, hasMore };
}
