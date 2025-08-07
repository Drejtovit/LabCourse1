export default function LatestJobsSection({children, company, location, employer,type, ...props}) {
    return (
        <div className="col-lg-6 col-md-12 col-xs-12">
            <div className="jobs-latest">
                <div className="img-thumb">
                    {/* <img src="assets/img/features/img-1.jpg" alt="" /> */}
                </div>
                <div className="content">
                    <h3><a href="job-details.html">{children}</a></h3>
                    <p className="brand">{company}</p>
                    <div className="tags">
                        <span><i className="lni-map-marker"></i>{location}</span>
                        <span><i className="lni-user"></i>{employer}</span>
                    </div>
                    <div className="tag mb-3"><i className="lni-tag"></i> #Html #Css #PHP</div>
                    <span className={type}>{type}</span>
                </div>
            </div>
        </div>
    )
}