
export default function Job({children,company, location, employer,type, ...props}) {
    return (
        <div className="col-lg-6 col-md-12 col-xs-12">
            <a className="job-listings-featured" href="job-details.html">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="job-company-logo">
                            <img src="assets/img/features/img1.png" width={40} height={40} alt="" />
                        </div>
                        <div className="job-details">
                            <h3>{children}</h3>
                            <span className="company-name">{company}</span>
                            <div className="tags">
                                <span><i className="lni-map-marker"></i> {location}</span>
                                <span><i className="lni-user"></i>{employer}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-12 text-right">
                        <div className="tag-type">
                            <span className="heart-icon">
                                <i className="lni-heart"></i>
                            </span>
                            <span className={type}>{type}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}