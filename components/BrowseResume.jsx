export default function BrowseResumes({children,name,position, location, rate, skills, experience}) {
    return (
        <div className="col-lg-6 col-md-6 col-xs-12">
            <div className="manager-resumes-item">
                <div className="manager-content">
                    <a href="resume.html"><img className="resume-thumb" src="assets/img/jobs/avatar-1.jpg"
                        alt="" /></a>
                    <div className="manager-info">
                        <div className="manager-name">
                            <h4><a href="#">{name}</a></h4>
                            <h5>{position}</h5>
                        </div>
                        <div className="manager-meta">
                            <span className="location"><i className="ti-location-pin"></i>{location}</span>
                            <span className="rate"><i className="ti-time"></i> ${rate} per hour</span>
                        </div>
                    </div>
                </div>
                <div className="item-body">
                    <div className="content">
                        <p>{children}</p>
                    </div>
                    <div className="resume-skills">
                        <div className="tag-list float-start">
                            <span>{skills[0]}</span>
                            <span>{skills[1]}</span>
                            <span>{skills[2]}</span>
                            <span>{skills[3]}</span>
                        </div>
                        <div className="resume-exp float-end">
                            <a href="#" className="btn btn-common btn-xs">Exp. {experience}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}