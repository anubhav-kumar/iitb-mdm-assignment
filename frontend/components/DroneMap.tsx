import React, { useState, useEffect } from "react";
import Map from "./Map";

const drones = [
  {
    id: "dr1",
    name: "Survey Area A",
    lat: 28.6,
    lng: 77.2,
    battery: "85%",
  },
  {
    id: "dr2",
    name: "Bridge Inspection",
    lat: 28.61,
    lng: 77.21,
    battery: "65%",
  },
];

function getAverageLatLng(drones: any) {
  if (!drones || drones.length === 0) {
    return { lat: 0, lng: 0 }; // Return a default or handle error for empty array
  }

  let totalLat = 0;
  let totalLng = 0;

  for (const drone of drones) {
    totalLat += drone.lat;
    totalLng += drone.lng;
  }

  const averageLat = totalLat / drones.length;
  const averageLng = totalLng / drones.length;
  console.log([averageLng, averageLat]);
  return [averageLat, averageLng];
}

const DroneMap = (props: any) => {
  const { drones } = props;
  const [center, setCenter] = useState([28.61, 77.21]);
  useEffect(() => {
    setCenter(getAverageLatLng(drones));
  }, [drones]);
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        Mission Live Location
      </h3>
      <Map drones={drones} center={center} zoom={12} />
    </div>
  );
};

export default DroneMap;
