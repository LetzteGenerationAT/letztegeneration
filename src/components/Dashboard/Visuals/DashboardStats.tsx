export default function DashboardStats({
  title,
  icon,
  value,
  description,
  colorIndex,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
  colorIndex: number;
}) {
  const COLORS = ["primary", "accent"];
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className={`stat-figure text-${COLORS[colorIndex % 2]}`}>
          {icon}
        </div>
        <div className="stat-title">{title}</div>
        <div className={`stat-value text-${COLORS[colorIndex % 2]}`}>
          {value}
        </div>
        <div className="stat-desc">{description}</div>
      </div>
    </div>
  );
}
