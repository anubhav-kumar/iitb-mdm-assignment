import { useState } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const StartMissionModal = (props: ModalProps) => {
  const { isOpen, onClose, title } = props;
  const onSubmit = () => {
    alert("On submit to be integrated");
  };
  const [selectedMission, setSelectedMission] = useState("");
  const [selectedDrone, setSelectedDrone] = useState("");
  if (!isOpen) return null;
  const missions = [{ id: "Some Id", name: "Some Name" }];
  const drones = [{ id: "Some Id", name: "Some Name" }];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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
                <Button label="Submit" variant="primary" onClick={onSubmit} />
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
