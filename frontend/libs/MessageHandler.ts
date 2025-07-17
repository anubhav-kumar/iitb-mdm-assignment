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
      console.log(`In handler: ${JSON.stringify(data)}`);
      setLiveMissionData((prevData) => {
        prevData[`drone-${data.droneId}`] = {
          id: data.missionId,
          name: data.droneName,
          droneId: data.droneId,
          lat: data.latitude,
          lng: data.longitude,
          alt: data.altitude,
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
