export default function RingerStats({
  title,
  icon,
  value,
  description,
  colorIndex,
}: {
  title: string;
  icon: React.ReactNode;
  value?: string;
  description?: string;
  colorIndex: number;
}) {
  const COLORS = ["primary", "accent"];
  return (
    <div className="stats shadow">
      <div className="stat">
        {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          <div className={`stat-figure text-${COLORS[colorIndex % 2]}`}>
            {icon}
          </div>
        }
        <div className="stat-title">{title}</div>

        {value === undefined ? (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            style={{ "--value": 50 }}
          ></div>
        ) : (
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          <div className={`stat-value text-${COLORS[colorIndex % 2]}`}>
            {value}
          </div>
        )}
        <div className="stat-desc">{description}</div>
      </div>
    </div>
  );
}
