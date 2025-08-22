export default function JobAlertItem({ title, location, keywords, type, frequency }) {
  return (
    <div className="alerts-content">
      <div className="row">
        <div className="col-md-3">
          <h3>{title}</h3>
          <span className="location">
            <i className="lni-map-marker"></i> {location}
          </span>
        </div>
        <div className="col-md-3">
          <p>{keywords}</p>
        </div>
        <div className="col-md-3">
          <p>
            <span className={type.toLowerCase().replace(" ", "-")}>{type}</span>
          </p>
        </div>
        <div className="col-md-3">
          <p>{frequency}</p>
        </div>
      </div>
    </div>
  );
}