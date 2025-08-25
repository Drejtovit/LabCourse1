export default function BookMarkedJob({children,company, location,type, props}) {
    return (
        <a className="job-listings" href="job-details.html">
            <div className="row">
                <div className="col-lg-4 col-md-12 col-xs-12">
                    <div className="job-company-logo">
                        {/* <img src="assets/img/features/img1.png" alt=""/> */}
                    </div>
                    <div className="job-details">
                        <h3>{children}</h3>
                        <span className="company-name">
                            {company}
                        </span>
                    </div>
                </div>
                <div className="col-lg-3 col-md-12 col-xs-12 text-right">
                    <div className="location">
                        <i className="lni-map-marker"></i> {location}
                    </div>
                </div>
                <div className="col-lg-2 col-md-12 col-xs-12 text-right">
                    <span className="btn-full-time">{type}</span>
                </div>
                <div className="col-lg-3 col-md-12 col-xs-12 text-right">
                    <span className="btn-apply">Apply Now</span>
                </div>
            </div>
        </a>
    );
} 