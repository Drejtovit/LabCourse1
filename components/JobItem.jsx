"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function JobItem({ id, title, location, type }) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


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
      // console.log(data.errors.general);
      toast.error(data.errors.general, { toastId: `error-delete-job` });
      router.replace("/");//Re look at this
    }
    window.location.reload();
  }


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
          <button className="btn btn-xs btn-danger" onClick={handleDelete} >Delete</button>
          <Link className="btn btn-xs btn-secondary mt-2" href={`/job/edit/${id}`}>Edit</Link>

          {/* <div className="can-img">
            <a href="#">
              <img src={img} alt="" />
            </a>
          </div> */}
        </div>
        {/* <Link className="btn btn-xs btn-secondary " href={`/job/edit/${jobId}`}>Edit</Link> */}


      </div>
    </div>
  );
}
