"use client"
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function JobItem({ id, title, location, type, applicationsCount }) {

  const router = useRouter();

  async function handleDelete() {
    let confirmDelete;
    toast.warning(
      <div>
        <p className="text-danger" style={{ fontSize: "1em" }}>
          Are you sure you want to delete this resume? <br />
          <strong style={{ fontSize: "0.87em" }}>(This action cannot be undone!)</strong>
        </p>
        <div className="mt-2">
          <button onClick={() => { confirmDelete = true; toast.dismiss(); }} className="btn btn-danger btn-xs-slim me-4 px-3 py-1">
            Yes
          </button>
          <button onClick={() => { confirmDelete = false; toast.dismiss(); }} className="btn btn-secondary btn-xs-slim px-3 py-1">
            No
          </button>
        </div>
      </div>,
      { autoClose: 15000, closeOnClick: false, toastId: `delete-resume`, draggable: true, }
    );

    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (confirmDelete !== undefined) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
      setTimeout(() => {
        confirmDelete = false;
        clearInterval(interval);
        resolve();
      }, 15000);
    });

    if (!confirmDelete) return;
    const job = await fetch(`/api/job/${id}`, {
      method: "DELETE",
    });
    const data = await job.json();

    if (!job.ok || data.errors) {
      toast.error(data.errors.general, { toastId: `error-delete-job` });
      router.replace("/");//Re look at this
    }
    router.refresh();
  }


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
            <button className="btn btn-xs btn-danger w-100 w-md-auto" onClick={handleDelete}>
              Delete
            </button>
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
