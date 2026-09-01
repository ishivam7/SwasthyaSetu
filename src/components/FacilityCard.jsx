import Button from "./Button.jsx";
import StatusBadge from "./StatusBadge.jsx";

function FacilityCard({
  facility,
  rank,
  onViewDetails,
  onDirections
}) {
  return (
    <article className="facility-card">

      <div className="facility-card-header">

        <div className="facility-logo">
          🏥
        </div>

        <div className="facility-main-info">

          {rank && (
            <span className="facility-rank">
              #{rank} RECOMMENDED
            </span>
          )}

          <h3>
            {facility.name}
          </h3>

          <p>
            {facility.type}
          </p>

          <span className="facility-distance">
            📍 {facility.distance} away
          </span>

        </div>

        <div className="facility-score">
          <strong>
            {facility.score}%
          </strong>

          <span>
            suitability
          </span>
        </div>

      </div>

      <div className="facility-services">

        <div className="facility-service">
          <span className="service-icon">
            👨‍⚕️
          </span>

          <div>
            <small>Doctor</small>
            <strong>
              {facility.doctor}
            </strong>
          </div>
        </div>

        <div className="facility-service">
          <span className="service-icon">
            🧪
          </span>

          <div>
            <small>Diagnostics</small>
            <strong>
              {facility.diagnostics}
            </strong>
          </div>
        </div>

        <div className="facility-service">
          <span className="service-icon">
            💊
          </span>

          <div>
            <small>Medicines</small>
            <strong>
              {facility.medicine}
            </strong>
          </div>
        </div>

        <div className="facility-service">
          <span className="service-icon">
            ⏱
          </span>

          <div>
            <small>Waiting time</small>
            <strong>
              {facility.wait}
            </strong>
          </div>
        </div>

      </div>

      <div className="facility-card-footer">

        <StatusBadge
          status="Available"
        />

        <div className="facility-actions">

          <Button
            variant="outline"
            size="small"
            onClick={onViewDetails}
          >
            View Details
          </Button>

          <Button
            size="small"
            onClick={onDirections}
          >
            Get Directions →
          </Button>

        </div>

      </div>

    </article>
  );
}

export default FacilityCard;