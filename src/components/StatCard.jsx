function StatCard({
  icon,
  value,
  label,
  description,
  trend,
  trendType = "positive"
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-card-icon">
          {icon}
        </div>

        {trend && (
          <span
            className={`stat-trend stat-trend-${trendType}`}
          >
            {trend}
          </span>
        )}
      </div>

      <div className="stat-card-value">
        {value}
      </div>

      <div className="stat-card-label">
        {label}
      </div>

      {description && (
        <div className="stat-card-description">
          {description}
        </div>
      )}
    </div>
  );
}

export default StatCard;