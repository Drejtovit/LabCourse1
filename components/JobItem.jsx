"use client"
import Link from 'next/link';
import DeleteButton from './DeleteButton.jsx';

export default function JobItem({ id, title, location, type, applicationsCount }) {

  return (
    <div className="alerts-content py-3 border-bottom">
      <div className="row align-items-center g-3">
        <div className="col-12 col-md-4 text-center text-md-start">
          <h3 className="mb-1">{title}</h3>
          <span className="location d-block mb-1 text-muted small">
            <i className="lni-map-marker"></i> {location}
          </span>
        </div>
        <div className="col-12 col-md-3 text-center text-md-start">
          <span className={type === "Full-time" ? "full-time" : type === "Part-time" ? "part-time" : "contract"}>{type}</span>
        </div>
        <div className="col-12 col-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-center gap-2 mt-2 mt-md-0">
            <DeleteButton id={id} classes="btn btn-xs btn-danger w-100 w-md-auto" item="job">Delete</DeleteButton>
            <Link className="btn btn-xs btn-secondary w-100 w-md-auto" href={`/job/edit/${id}`}>
              Edit
            </Link>
            {applicationsCount > 0 ? (
              <span className="badge bg-info mt-2 px-3 py-2">
                {applicationsCount} {applicationsCount === 1 ?
                  (<> Candidate  <i className="lni lni-user"></i></>) :
                  (<> Candidates <i className="lni lni-users"></i></>)}
              </span>
            ) : (
              <span className="badge bg-secondary mt-2 px-2 py-2">
                No Candidates <i className="lni lni-users"></i>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
