import Link from "next/link";

export default function BrowseResumes({ children, id, name, profession, location, skills, experience, email }) {
    return (
        <div className="col-lg-6 col-md-6 col-xs-12">
            <div className="manager-resumes-item">
                <div className="manager-content">
                    <a href="resume.html"><img className="resume-thumb" src="assets/img/jobs/avatar-1.jpg"
                        alt="" /></a>
                    <div className="manager-info">
                        <div className="manager-name">
                            <h4><a href="#">{name}</a></h4>
                            <h5>{profession}</h5>
                        </div>
                        <div className="manager-meta">
                            <span className="location"><i className="lni lni-map-marker me-2 pt-2"></i>{location}</span>
                            <span className="email"><i className="lni lni-envelope me-2 pt-2"></i>{email}</span>
                        </div>
                    </div>
                </div>
                <div className="item-body">
                    <div className="content">
                        <p>{children}</p>
                    </div>
                    <div className="row ">
                        <div className="resume-skills">
                            <div className="tag-list float-start">
                                <span>{skills[0]}</span>
                                <span>{skills[1]}</span>
                                <span>{skills[2]}</span>
                                <span>{skills[3]}</span>
                            </div>
                            <div className="resume-exp float-end">
                                <span className="btn btn-secondary btn-xs" style={{ cursor: 'default' }}>Exp. {experience}</span>
                            </div>
                        </div>
                        <div className="item-footer my-2">
                            <Link href={`/resume/browse/${id}`} className="btn btn-common btn-sm float-end"
                            >View details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}