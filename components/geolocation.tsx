import React, { useEffect, useState } from "react";

export default function GeoLocationPage() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  //   const successCallback = (position: any) => {
  //     console.log(position);
  //   };

  //   const errorCallback = (error: any) => {
  //     console.log(error);
  //   };

  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return (
    <div>
      GeoLocation
      <div>{location.latitude}</div>
      <div>{location.longitude}</div>
    </div>
  );
}
