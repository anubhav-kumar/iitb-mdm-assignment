import DroneMission from '../models/DroneMission';

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
      .select('droneId -_id')
      .lean();

    console.log('In progress done Ids: ' + JSON.stringify(inProgressDroneIds));
    inProgressDroneIds.forEach((val) => {
      const droneId = val.droneId;
      const telemetry = {
        droneId: droneId,
        battery: 40 - Math.floor(Math.random() * 10),
        latitude: 18.59 + Math.random() * 0.01,
        longitude: 73.73 + Math.random() * 0.01,
        altitude: 41 + Math.random() * 10,
      };
      broadcastDroneTelemetry(wss, telemetry);
    });

  }, 20000);
}
export default mockTelemetry;