import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Circle,
} from "react-google-maps";
// import { UserContext } from "../context/UserContext";
// import { GameContext } from "../context/GameContext";
// import mapStyles from "../components/style/mapStyles";
// import "../components/style/Map.css";
import { getEffectiveTypeParameterDeclarations, setTextRange } from "typescript";
import { Event } from "../models/event";

const options = {
  mapTypeControl: false,
  panControl: false,
  streetViewControl: false,
  zoomControl: false,
};

function Map(): any {
  //   const userContext = useContext(UserContext);
  //   const gameContext = useContext(GameContext);

  const [userEvents, setUserEvents] = useState<Event[] | null>(null);
  //   const [selectedCity, setSelectedCity] = useState(null);
  //   const [currentLocation, setCurrentLocation] = useState(null);
  //   const [userChosenLocation, setUserChosenLocation] = useState(null);
  //   const [action, setAction] = useState(null);
  //   const [formValues, setFormValues] = useState(null);

  //   function getCurrentLocation(position) {
  //     setCurrentLocation({
  //       lat: parseFloat(position.coords.latitude),
  //       lng: parseFloat(position.coords.longitude),
  //     });
  //   }

  //   const handleClick = ({ latLng }) => {
  //     setUserChosenLocation({
  //       lat: latLng.lat(),
  //       lng: latLng.lng(),
  //     });
  //     const distance = getDistance(latLng, {
  //       lat: () => currentLocation.lat,
  //       lng: () => currentLocation.lng,
  //     });
  //     gameContext.setDistance(distance);
  //   };

  async function getAndSet(url: string, setter: Function) {
    const { data } = await axios.get(url);
    const events: Event[] = data;
    setter(events);
    return events;
  }

  useEffect(() => {
    const locations = getAndSet("/events/all", setUserEvents);
    console.log(locations);
    // (async () => {
    //   try {
    //     const { data: currentCities } = await axios.get("/api/v1/cities");
    //     // setCities(currentCities);
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(getCurrentLocation);
    //     } else {
    //       setCurrentLocation({ lat: 31.768318, lng: 35.213711 });
    //       alert("Geolocation is not supported by this browser.");
    //     }
    //   } catch (e) {
    //     console.error(e.message);
    //   }
    // })();
  }, []);
  const map = userEvents ? (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 31.771959, lng: 35.217018 }}
      //   defaultOptions={{ ...options, styles: mapStyles }}
      //   onClick={handleClick}
    >
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
