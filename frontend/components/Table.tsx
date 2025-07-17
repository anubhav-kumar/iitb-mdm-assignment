import Button from "./Button";

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const markMissionAsComplete = async (missionId: number) => {
  await fetch("http://localhost:3000/complete-mission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      droneMissionId: missionId,
    }),
  });
};
const Table = (props: TableProps) => {
  const { columns, data } = props;
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        Live Drone Missions
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} className="px-4 py-2">
                  {col.header}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <>
                    <td key={col.accessor} className="px-4 py-2">
                      {row[col.accessor]}
                    </td>
                  </>
                ))}
                <td>
                  <Button
                    label="Mark complete"
                    onClick={() => {
                      markMissionAsComplete(row.droneMissionId);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
