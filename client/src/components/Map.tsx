import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import { getEffectiveTypeParameterDeclarations, setTextRange } from "typescript";
import { Event } from "../models/event";

const options = {
  mapTypeControl: false,
  panControl: false,
  streetViewControl: false,
  zoomControl: false,
};

function Map(): any {
  const [userEvents, setUserEvents] = useState<Event[] | null>(null);

  async function getAndSet(url: string, setter: Function) {
    const { data } = await axios.get(url);
    const events: Event[] = data;
    setter(events);
    return events;
  }

  useEffect(() => {
    getAndSet("/events/all", setUserEvents);
  }, []);

  const map = userEvents ? (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 31.771959, lng: 35.217018 }}>
      {userEvents.map((event: Event) => {
        return (
          <>
            <Marker
              key={event.session_id}
              position={{
                lat: event.geolocation.location.lat,
                lng: event.geolocation.location.lng,
              }}
            />
          </>
        );
      })}
    </GoogleMap>
  ) : (
    <h1>Loading..</h1>
  );
  return map;
}

const WrappedMap: any = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
