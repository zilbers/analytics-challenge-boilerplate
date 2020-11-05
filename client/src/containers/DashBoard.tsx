import React, { useState, useEffect } from "react";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import WrappedMap from "../components/Map";
import Chart from "../components/Chart";
import ChooseCharts from "../components/ChooseCharts";

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const DashBoard: React.FC = () => {
  const [showingCharts, setShowingCharts] = useState<{
    map: boolean;
    chartByDay: boolean;
    chartByHour: boolean;
  }>({ map: false, chartByDay: false, chartByHour: false });

  return (
    <>
      <ChooseCharts showingCharts={showingCharts} setShowingCharts={setShowingCharts} />

      {showingCharts.map && (
        <WrappedMap
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
        />
      )}
      {showingCharts.chartByDay && <Chart url={`/events/by-days/${5}`} time="date" />}
      {showingCharts.chartByHour && <Chart url={`/events/by-hours/${7}`} time="hour" />}
    </>
  );
};

export default DashBoard;
