import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, YAxis, XAxis } from "recharts";
import DatePicker from "../components/DatePicker";

function Chart({ url, time }: any) {
  const [eventsData, setEventsData] = useState<any[] | undefined>(undefined);

  async function getAndSet(url: string, setter: Function) {
    const { data } = await axios.get(url);
    const events: Event[] = data;
    setter(events);
    return events;
  }

  useEffect(() => {
    getAndSet(url, setEventsData);
  }, []);
  return (
    <>
      {time == "hour" ? (
        <div className="date-picker">
          <DatePicker />
        </div>
      ) : (
        <div className="date-picker">
          <DatePicker />
          <DatePicker />
        </div>
      )}
      <h3>by-{time} chart</h3>
      <LineChart width={600} height={300} data={eventsData}>
        <Line type="monotone" dataKey={"count"} stroke="black" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey={time} />
        <YAxis />
      </LineChart>
    </>
  );
}

export default Chart;
