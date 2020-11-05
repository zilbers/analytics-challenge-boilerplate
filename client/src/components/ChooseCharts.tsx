import React from "react";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";

function ChooseCharts({ showingCharts, setShowingCharts }: any) {
  return (
    <>
      <div className="ChooseCharts">
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
      </div>
    </>
  );
}

export default ChooseCharts;
