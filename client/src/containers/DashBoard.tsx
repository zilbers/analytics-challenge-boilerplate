import React, { useState, useEffect } from "react";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import WrappedMap from "../components/Map";
import LineChart from "../components/LineChart";
import CohortGraph from "../components/CohortGraph";
import ChooseCharts from "../components/ChooseCharts";
import styled, { css } from "styled-components";

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;

const DashBoard: React.FC = () => {
  const [showingCharts, setShowingCharts] = useState<{
    map: boolean;
    chartByDay: boolean;
    chartByHour: boolean;
    RetentionGraph: boolean;
  }>({ map: false, chartByDay: false, chartByHour: false, RetentionGraph: false });

  return (
    <>
      <ChooseCharts showingCharts={showingCharts} setShowingCharts={setShowingCharts} />

      {showingCharts.map && (
        <>
          <h3>by-location chart</h3>
          <WrappedMap
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `30%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          />
        </>
      )}
      <Container>
        {showingCharts.RetentionGraph && <CohortGraph />}
        {/* <ContainerLineChart> */}
        {showingCharts.chartByDay && <LineChart url={`/events/by-days/`} time="date" />}
        {showingCharts.chartByHour && <LineChart url={`/events/by-hours/`} time="hour" />}
        {/* </ContainerLineChart> */}
      </Container>
    </>
  );
};

export default DashBoard;
