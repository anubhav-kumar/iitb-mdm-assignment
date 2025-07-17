import { useEffect, useState } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setIsOpen: () => any;
}

const getMissions = async() => {
  const missionData = await fetch("http://localhost:3000/missions");
  const missionJson = await missionData.json();
  return missionJson.missions.map((dt) => {
    return {
      id: dt._id,
      name: dt.name,
    };
  });
};

const getDrones = async() => {
  const droneData = await fetch("http://localhost:3000/drones");
  const droneJson = await droneData.json();
  return droneJson.drones.map((dt) => {
    return {
      id: dt._id,
      name: dt.name,
    };
  });
};

const onSubmit = async (selectedDrone, selectedMission, setIsOpen) => {
  const resp = await fetch("http://localhost:3000/start-mission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      droneId: selectedDrone,
      missionId: selectedMission,
    }),
  });
  if (resp.ok) {
    setIsOpen(false);
  }
};

const StartMissionModal = (props: ModalProps) => {
  const { isOpen, onClose, title, setIsOpen } = props;
  const [missions, setMissions] = useState([]);
  const [drones, setDrones] = useState([]);
  const [selectedMission, setSelectedMission] = useState("");
  const [selectedDrone, setSelectedDrone] = useState("");
  useEffect(() => {
    async function updateDropdowns() {
      const [droneList, missionList] = await Promise.all([
        getDrones(),
        getMissions(),
      ]);
      setDrones(droneList);
      setMissions(missionList);
    }
    updateDropdowns();
  }, []);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {title}
              </label>
              <select
                value={selectedMission}
                onChange={(e) => setSelectedMission(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select a mission
                </option>
                {missions.map((mission) => (
                  <option key={mission.id} value={mission.id}>
                    {mission.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Drone
              </label>
              <select
                value={selectedDrone}
                onChange={(e) => setSelectedDrone(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select a drone
                </option>
                {drones.map((drone) => (
                  <option key={drone.id} value={drone.id}>
                    {drone.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <div className="mr-1">
                <Button
                  label="Submit"
                  variant="primary"
                  onClick={() => {
                    onSubmit(selectedDrone, selectedMission, setIsOpen);
                  }}
                />
              </div>
              <Button label="Close" variant="secondary" onClick={onClose} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartMissionModal;
