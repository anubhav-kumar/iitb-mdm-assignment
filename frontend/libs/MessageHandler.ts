const MessageHandler = (message: any) => {
  const {
    type,
    data,
    setDroneStateCounters,
    setLiveMissionData,
    setDroneLocations,
  } = message;
  switch (type) {
    case "livemissioncount":
      setDroneStateCounters((prev) => ({ ...prev, live: data.count }));
      break;
    case "idledronecount":
      setDroneStateCounters((prev) => ({ ...prev, idle: data.count }));
      break;
    case "chargingdronecount":
      setDroneStateCounters((prev) => ({ ...prev, charging: data.count }));
      break;
    case "dronedata":
      setLiveMissionData((prevData) => {
        prevData[`drone-${data.droneId}`] = {
          droneMissionId: data.droneMissionId,
          droneMissionStatus: data.droneMissionStatus,
          missionName: data.missionName,
          droneName: data.droneName,
          latitude: data.latitude,
          longitude: data.longitude,
          altitude: data.altitude,
          battery: `${data.battery} %`,
        };
        return prevData;
      });
      setDroneLocations((prevLocations) => {
        prevLocations[`drone-${data.droneId}`] = {
          id: data.droneId,
          name: data.droneName,
          lat: data.latitude,
          lng: data.longitude,
          battery: `${data.battery} %`,
        };
        return prevLocations;
      });
      break;
  }
};

export default MessageHandler;
