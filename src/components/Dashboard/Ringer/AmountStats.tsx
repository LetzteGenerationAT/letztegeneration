export default function AmountStats({ className }: { className?: string }) {
  return (
    <div className={`${className ?? ""} stats bg-base-100 shadow`}>
      <div className="stat">
        <div className="stat-title">Amount to be Collected</div>
        <div className="stat-value">$25,600</div>
        <div className="stat-actions">
          <button className="btn-xs btn">View Users</button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Cash in hand</div>
        <div className="stat-value">$5,600</div>
        <div className="stat-actions">
          <button className="btn-xs btn">View Members</button>
        </div>
      </div>
    </div>
  );
}
