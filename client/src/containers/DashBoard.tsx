import React, { useState, useEffect } from "react";
import axios from "axios";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import WrappedMap from "../components/Map";

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const DashBoard: React.FC = () => {
  // const [userEvents, setUserEvents] = useState<Event[] | null>(null);

  // async function getAndSet(url: string, setter: Function) {
  //   const { data } = await axios.get(url);
  //   console.log(data);
  //   const events: Event[] = data;
  //   setter(events);
  //   return events;
  // }
  // useEffect(() => {
  //   const locations = getAndSet("/events/all", setUserEvents);
  //   console.log(locations);
  // }, []);
  return (
    <>
      <WrappedMap
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
      />
    </>
  );
};

export default DashBoard;
