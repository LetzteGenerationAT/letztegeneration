export default function RingerStats({
  title,
  icon,
  value,
  description,
  colorIndex,
  className,
}: {
  title: {
    left: string;
    right: string;
  };
  icon: {
    left: React.ReactNode;
    right: React.ReactNode;
  };
  value?: {
    left: number;
    right: number;
  };
  description?: {
    left: string;
    right: string;
  };
  colorIndex: number;
  className?: string;
}) {
  return (
    <div className={`${className ?? ""} stats bg-base-100 shadow`}>
      <div className="stat">
        <div className="stat-title">{title?.left}</div>
        <div className="stat-value">{value?.left}</div>
        {description?.right && (
          <div className="stat-desc">{description?.left}</div>
        )}
      </div>

      <div className="stat">
        <div className="stat-title">{title?.right}</div>
        <div className="stat-value">{value?.right}</div>
        {description?.right && (
          <div className="stat-desc">{description?.right}</div>
        )}
      </div>
    </div>
  );
}
