"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ResumeCard({ name, specialization, location, status, image, active, resumeId, candidate }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSetActive() {
        setIsLoading(true);
        const res = await fetch("/api/resume/activate", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                resumeId: resumeId,
                candidateId: candidate,
            }),
        });
        const data = await res.json();
        if (!res.ok || data.errors) {
            toast.error(data.errors.general, { toastId: `error-activate-resume` });
            router.replace("/");//Re look at this
        }
        setIsLoading(false);
        window.location.reload();
    }

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
        const res = await fetch(`/api/resume/${resumeId}`, {
            method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok || data.errors) {
            toast.error(data.errors.general, { toastId: `error-delete-resume` });
            router.replace("/");//Re look at this
        }
        window.location.reload();
    }

    return (
        <div className="manager-resumes-item">
            <div className="manager-content">
                <Image src={image} alt={`${name}'s resume`} width={80} height={70} className="resume-thumb " style={{ maxWidth: "80px" }} />
                <div className="manager-info">
                    <div className="manager-name">
                        <h4>{name}</h4>
                        <h5>{specialization}</h5>
                    </div>
                    <div className="manager-meta">
                        <span className="location"><i className="lni-map-marker"></i>{location}</span>
                    </div>
                </div>
            </div>
            <div className="update-date d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                <p className="status">
                    <strong className='me-1'>Updated on:</strong>{status}
                </p>
                <div className="action-btn d-flex flex-wrap flex-md-row  mt-2 mt-md-0 justify-content-between align-items-center gap-2">
                    <div className='d-flex align-items-center gap-1'>
                        <span className={`badge ${active ? "bg-success" : "bg-secondary"}`}>
                            {active ? "Active" : "Inactive"}
                        </span>
                        {!active &&
                            <button
                                className={`btn btn-xs-slim  btn-light border border-dark text-dark`}
                                onClick={!active ? () => handleSetActive() : undefined}
                                disabled={isLoading || active}
                                title={active ? "This resume is currently active" : "Set this resume as active"}
                                style={{ cursor: isLoading || active ? "not-allowed" : "pointer" }}
                            >
                                {isLoading ? "Activating..." : " Set Active"}
                            </button>}
                    </div>
                    <Link className="btn btn-xs btn-secondary " href={`/resume/edit/${resumeId}`}>Edit</Link>
                    <button className="btn btn-xs btn-danger" onClick={handleDelete} disabled={active}>Delete</button>
                </div>
            </div>
        </div>
    );
}