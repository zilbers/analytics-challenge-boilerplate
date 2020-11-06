import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, Legend, YAxis, XAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import styled, { css } from "styled-components";

const data = [
  { name: "a", value: 12 },
  { name: "b", value: [5, 12] },
];

const Container = styled.div`
  @media (max-width: 600px) {
    width: 100%;
  }

  @media (min-width: 600px) {
    width: 70%;
  }

  @media (min-width: 900px) {
    width: 40%;
  }

  @media (min-width: 1600px) {
    width: 600px;
  }
`;

function Chart() {
  const [userEvents, setUserEvents] = useState<Event[] | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  async function getAndSet(url: string, setter: Function) {
    const { data } = await axios.get(url);
    const events: Event[] = data;
    setter(events);
    return events;
  }

  useEffect(() => {
    getAndSet("/events/all", setUserEvents);
  }, []);

  return (
    <Container>
      <h3>by-os chart</h3>

      <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="value" barSize={30} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default Chart;
