import React from "react";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

function ChooseCharts({ showingCharts, setShowingCharts }: any) {
  return (
    <Container>
      <span>
        <input
          type="checkbox"
          id="map"
          name="map"
          value="map"
          onChange={(e) => {
            setShowingCharts({ ...showingCharts, map: !showingCharts.map });
          }}
          checked={showingCharts.map}
        />
        <label htmlFor="vehicle1">Events by location</label>
      </span>
      <span>
        <input
          type="checkbox"
          id="logs"
          name="logs"
          value="logs"
          onChange={(e) => {
            setShowingCharts({ ...showingCharts, logs: !showingCharts.logs });
          }}
          checked={showingCharts.logs}
        />
        <label htmlFor="logs">Logs</label>
      </span>
      <span>
        <input
          type="checkbox"
          id="by-day"
          name="by-day"
          value="by-day"
          onChange={(e) => {
            setShowingCharts({ ...showingCharts, chartByDay: !showingCharts.chartByDay });
          }}
          checked={showingCharts.chartByDay}
        />
        <label htmlFor="by-day">Events by-day</label>
      </span>
      <span>
        <input
          type="checkbox"
          id="by-hour"
          name="by-hour"
          value="by-hour"
          onChange={(e) => {
            setShowingCharts({ ...showingCharts, chartByHour: !showingCharts.chartByHour });
          }}
          checked={showingCharts.chartByHour}
        />
        <label htmlFor="by-hour">Events by-hour</label>
      </span>
      <span>
        <input
          type="checkbox"
          id="retention"
          name="retention"
          value="retention"
          onChange={(e) => {
            setShowingCharts({ ...showingCharts, RetentionGraph: !showingCharts.RetentionGraph });
          }}
          checked={showingCharts.RetentionGraph}
        />
        <label htmlFor="retention">Retention graph</label>
      </span>
    </Container>
  );
}

export default ChooseCharts;
