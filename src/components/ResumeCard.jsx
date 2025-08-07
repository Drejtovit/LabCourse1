export default function ResumeCard({name, specialization, location, wage, status}) {
    return (
        <div className="manager-resumes-item">
            <div className="manager-content">
                <a href="resume.html"><img className="resume-thumb" src="assets/img/jobs/avatar-1.jpg"
                    alt="" /></a>
                <div className="manager-info">
                    <div className="manager-name">
                        <h4>{name}</h4>
                        <h5>{specialization}</h5>
                    </div>
                    <div className="manager-meta">
                        <span className="location"><i className="lni-map-marker"></i> {location}</span>
                        <span className="rate"><i className="lni-alarm-clock"></i> ${wage} per hour</span>
                    </div>
                </div>
            </div>
            <div className="update-date">
                <p className="status">
                    <strong>Updated on:</strong> {status}
                </p>
                <div className="action-btn">
                    <a className="btn btn-xs btn-gray" href="#">Hide</a>
                    <a className="btn btn-xs btn-gray" href="#">Edit</a>
                    <a className="btn btn-xs btn-danger" href="#">Delete</a>
                </div>
            </div>
        </div>
    );
}