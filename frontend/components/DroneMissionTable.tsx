import React from "react";
import Table from "./Table";

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Mission Name", accessor: "name" },
  { header: "Drone ID", accessor: "droneId" },
  { header: "Latitude", accessor: "lat" },
  { header: "Longitude", accessor: "lng" },
  { header: "Altitude", accessor: "alt" },
  { header: "Battery", accessor: "battery" },
];

// const data = [
//   {
//     id: 1,
//     name: "Survey Area A",
//     droneId: "DR-001",
//     lat: 28.6,
//     lng: 77.2,
//     alt: 500,
//     battery: "85%",
//   },
//   {
//     id: 2,
//     name: "Bridge Inspection",
//     droneId: "DR-002",
//     lat: 28.61,
//     lng: 77.21,
//     alt: 400,
//     battery: "65%",
//   },
// ];

const DroneMissionTable = (props: any) => {
  const { data } = props;
  return <Table columns={columns} data={data} />;
};

export default DroneMissionTable;
