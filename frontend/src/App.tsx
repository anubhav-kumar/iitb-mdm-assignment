import "./App.css";
import { useState, useEffect, useRef } from "react";
import StatusCard from "../components/StatusCard";
import Button from "../components/Button";
import StartMissionModal from "../components/StartMissionModal";
import DroneMissionTable from "../components/DroneMissionTable";
import DroneMap from "../components/DroneMap";
import "leaflet/dist/leaflet.css";
import MessageHandler from "../libs/MessageHandler";

function App() {
  const [isSetMissionModalOpen, setSetMissionModalOpen] = useState(false);
  const [droneStateCounters, setDroneStateCounters] = useState({});
  const [liveMissionData, setLiveMissionData] = useState({});
  const [droneLocations, setDroneLocations] = useState({});
  const [isLive, setIsLive] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const [websocketMessages, setWebsocketMessages] = useState({});

  useEffect(() => {
    if (!wsRef.current) {
      console.log("Attempting to connect to WebSocket...");
      const ws = new WebSocket("ws://localhost:3000");

      ws.onopen = () => {
        setIsLive(true);
      };

      ws.onmessage = (event) => {
        setWebsocketMessages(JSON.parse(event.data));
      };

      ws.onerror = () => {
        setIsLive(false);
      };

      ws.onclose = () => {
        setIsLive(false);
        wsRef.current = null; // Clear the ref on disconnect
        // You might want to attempt re-connection here if needed
      };
      wsRef.current = ws;
    }
  });

  useEffect(() => {
    MessageHandler({
      type: websocketMessages.type,
      data: websocketMessages.data,
      setDroneStateCounters,
      setLiveMissionData,
      setDroneLocations,
    });
  }, [websocketMessages]);

  return (
    <>
      <StartMissionModal
        title="Start a Mission"
        isOpen={isSetMissionModalOpen}
        onClose={() => {
          setSetMissionModalOpen(false);
        }}
        setIsOpen={setSetMissionModalOpen}
      />
      <div className="flex gap-6 items-start">
        <StatusCard
          title="Ongoing missions"
          value={droneStateCounters.live}
          colorClass="text-blue-600"
        />
        <StatusCard
          title="Idle Drones"
          value={droneStateCounters.idle}
          colorClass="text-green-600"
        />
        <StatusCard
          title="Charging Drones"
          value={droneStateCounters.charging}
          colorClass="text-yellow-600"
        />
        <Button
          label="Start a Mission"
          onClick={() => {
            setSetMissionModalOpen(true);
          }}
        />
      </div>
      <div className="mt-4">
        <DroneMissionTable data={Object.values(liveMissionData)} />
      </div>
      <div className="w-1/2 mt-4">
        <DroneMap drones={Object.values(droneLocations)} />
      </div>
    </>
  );
}

export default App;
