import Table from "./Table";

const columns = [
  { header: "Mission Name", accessor: "missionName" },
  { header: "Drone Name", accessor: "droneName" },
  { header: "Latitude", accessor: "latitude" },
  { header: "Longitude", accessor: "longitude" },
  { header: "Altitude", accessor: "altitude" },
  { header: "Battery", accessor: "battery" },
  { header: "Status", accessor: "droneMissionStatus" },
];

const DroneMissionTable = (props: any) => {
  const { data } = props;
  return <Table columns={columns} data={data} />;
};

export default DroneMissionTable;
