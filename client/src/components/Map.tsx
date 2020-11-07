import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { getEffectiveTypeParameterDeclarations, setTextRange } from "typescript";
import { Event } from "../models/event";

const formatDate = (dateObj: Date) =>
  `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;

const options = {
  mapTypeControl: false,
  panControl: false,
  streetViewControl: false,
  zoomControl: false,
};

function Map(): any {
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

  const map = userEvents ? (
    <GoogleMap defaultZoom={3} defaultCenter={{ lat: 31.771959, lng: 35.217018 }}>
      <MarkerClusterer averageCenter enableRetinaIcons gridSize={70}>
        {userEvents.map((event: Event) => {
          return (
            <>
              <Marker
                key={event.session_id + event.distinct_user_id}
                position={{
                  lat: event.geolocation.location.lat,
                  lng: event.geolocation.location.lng,
                }}
                onClick={() => {
                  setSelectedEvent(event);
                }}
              />
            </>
          );
        })}
      </MarkerClusterer>
      {selectedEvent && (
        <InfoWindow
          position={{
            lat: selectedEvent.geolocation.location.lat,
            lng: selectedEvent.geolocation.location.lng,
          }}
          onCloseClick={() => setSelectedEvent(null)}
        >
          <div className="event-description">
            <h2>{selectedEvent.name}</h2>
            <h3>date: {formatDate(new Date(selectedEvent.date))}</h3>
            <h3>os: {selectedEvent.os}</h3>
            <h3>browser: {selectedEvent.browser}</h3>
            <h3>url: {selectedEvent.url}</h3>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <h1>Loading..</h1>
  );
  return map;
}

const WrappedMap: any = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
