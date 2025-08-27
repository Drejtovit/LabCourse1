export default function JobItem({ title, location, type, featured }) {
  return (
    <div className="alerts-content">
      <div className="row">
        <div className="col-lg-3 col-md-5 col-xs-12">
          <h3>{title}</h3>
          <span className="location">
            <i className="lni-map-marker"></i>
            {location}
          </span>
        </div>
        <div className="col-lg-3 col-md-3 col-xs-12">
          <p>
            <span className="full-time">{type}</span>
          </p>
        </div>
        <div className="col-lg-3 col-md-2 col-xs-12">
          {/* <div className="can-img">
            <a href="#">
              <img src={img} alt="" />
            </a>
          </div> */}
        </div>
        <div className="col-lg-3 col-md-2 col-xs-12">
          <p>{featured ? <i className="lni-star"></i> : null}</p>
        </div>
      </div>
    </div>
  );
}
