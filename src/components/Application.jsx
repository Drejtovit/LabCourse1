export default function Application({children, company, type, date, status }) {
    return (
        <div className="applications-content">
            <div className="row">
                <div className="col-md-4">
                    <div className="thums">
                        {/* <img src="assets/img/jobs/img-1.jpg" alt="" /> */}
                    </div>
                    <h3>{children}</h3>
                    <span>{company}</span>
                </div>
                <div className="col-md-3">
                    <p><span className={type}>{type}</span></p>
                </div>
                <div className="col-md-3">
                    <p>{date}</p>
                </div>
                <div className="col-md-2">
                    <p>{status}</p>
                </div>
            </div>
        </div>
    )
}