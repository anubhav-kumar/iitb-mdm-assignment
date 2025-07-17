import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

interface Drone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  battery: string;
}

interface MapProps {
  drones: Drone[];
  center?: [number, number];
  zoom?: number;
}

const blueDotIcon = new L.DivIcon({
  className: "",
  html: '<span class="block w-[14px] h-[14px] rounded-full bg-blue-600 border-2 border-white shadow"></span>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function ChangeMapView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);

  return null;
}

const Map = (props: MapProps) => {
  const { drones, center, zoom } = props;
  return (
    <div className="w-full h-[350px] rounded-xl overflow-hidden border border-gray-300">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        className="w-full h-full"
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView center={center} zoom={zoom} />
        {drones.map((drone) => (
          <Marker
            key={drone.id}
            position={[drone.lat, drone.lng]}
            icon={blueDotIcon}
          >
            <Popup>
              <strong>{drone.name}</strong>
              <br />
              Battery: {drone.battery}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
