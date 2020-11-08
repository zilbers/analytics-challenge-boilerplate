import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
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
        {/* <PieChart width={730} height={250}>
          <Pie
            data={data01}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart> */}
      </ResponsiveContainer>
    </Container>
  );
}

export default Chart;
