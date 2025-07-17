import DroneMission from '../models/DroneMission';
import Drone from '../models/Drone';
import Mission from '../models/Mission';

// Broadcast function
function broadcastDroneTelemetry(wss, data) {
  const json = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(json);
    }
  });
}

async function mockTelemetry(wss) {
  setInterval(async() => {
    const inProgressDroneIds = await DroneMission
      .find({ status: 'in-progress' })
      .select('droneId missionId id')
      .lean();

    inProgressDroneIds.forEach(async(val, index) => {
      const droneId = val.droneId;
      const missionId = val.missionId;
      const droneData = await Drone.find({ id: droneId });
      const missionData = await Mission.find({ id: droneId });
      const telemetry = {
        type: 'dronedata',
        data: {
          missionId: missionId,
          droneName: droneData.name,
          droneId: droneId,
          battery: parseFloat((40 - Math.floor(Math.random() * 10).toFixed(2))),
          latitude: parseFloat((18.59 + (index * 0.01) + Math.random() * 0.01).toFixed(2)),
          longitude: parseFloat((73.73 + (index * 0.01) + Math.random() * 0.01).toFixed(2)),
          altitude: parseFloat((41 + Math.random() * 10).toFixed(2)),
        },
      };
      broadcastDroneTelemetry(wss, telemetry);
    });

    broadcastDroneTelemetry(wss, {
      type: 'livemissioncount',
      data: {
        count: inProgressDroneIds.length,
      },
    });

    broadcastDroneTelemetry(wss, {
      type: 'idledronecount',
      data: {
        count: parseFloat((Math.floor(Math.random() * 10)).toFixed(2)),
      },
    });

    broadcastDroneTelemetry(wss, {
      type: 'chargingdronecount',
      data: {
        count: parseFloat((Math.floor(Math.random() * 10)).toFixed(2)),
      },
    });

  }, 2000);
}
export default mockTelemetry;