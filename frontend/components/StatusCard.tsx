interface StatusCardProps {
  title: string;
  value: number | string;
  colorClass?: string;
}

const StatusCard = (props: StatusCardProps) => {
  const { title, value, colorClass } = props;
  return (
    <div className="flex-1 h-32 bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
      <div className="text-gray-700 text-lg font-semibold">{title}</div>
      <div
        className={`text-3xl font-bold mt-2 ${colorClass ? colorClass : "text-blue-600"}`}
      >
        {value}
      </div>
    </div>
  );
};

export default StatusCard;
