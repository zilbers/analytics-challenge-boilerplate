import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, YAxis, XAxis, ResponsiveContainer } from "recharts";
import DatePicker from "./DatePicker";
import styled, { css } from "styled-components";

const Today = new Date(new Date().toDateString()).getTime();
const msInDay = 24 * 60 * 60 * 1000;

const Container = styled.div`
  @media (max-width: 750px) {
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
  }
`;

function Chart({ url, time }: { url: string; time: string }) {
  const [eventsData, setEventsData] = useState<any[] | undefined>(undefined);
  const [date, setDate] = useState<number>(() => new Date(new Date().toDateString()).getTime());

  async function getAndSet(url: string, setter: Function) {
    const { data } = await axios.get(url);
    const events: any[] = data;
    if (events[0] && events[0].date) {
      events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    setter(events);
  }

  useEffect(() => {
    const offset: number =
      Math.round((Today - date) / msInDay) > 0 ? Math.round((Today - date) / msInDay) : 0;
    getAndSet(`${url}${offset}`, setEventsData);
  }, [date]);

  return (
    <Container>
      <DatePicker date={date} setDate={setDate} />
      <h3>by-{time} chart</h3>

      <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
        <LineChart data={eventsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <Line type="monotone" dataKey={"count"} stroke="black" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey={time} />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default Chart;
