import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, YAxis, XAxis } from "recharts";
import DatePicker from "../components/DatePicker";

const Today = new Date(new Date().toDateString()).getTime();
const msInDay = 24 * 60 * 60 * 1000;

function Chart({ url, time }: any) {
  const [eventsData, setEventsData] = useState<any[] | undefined>(undefined);
  const [date, setDate] = useState<number>(() => new Date(new Date().toDateString()).getTime());

  async function getAndSet(url: string, setter: Function) {
    const { data } = await axios.get(url);
    const events: Event[] = data;
    setter(events);
    return events;
  }

  useEffect(() => {
    const offset: number =
      Math.round((Today - date) / msInDay) > 0 ? Math.round((Today - date) / msInDay) : 0;
    getAndSet(`${url}${offset}`, setEventsData);
  }, [date]);

  return (
    <>
      <DatePicker date={date} setDate={setDate} />
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
