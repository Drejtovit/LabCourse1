"use client"
import Image from 'next/image';
import { useState } from 'react';
export default function ResumeCard({ name, specialization, location, wage, status, image, active, resumeId, candidate }) {

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
        if (!res.ok || data.error) {
            alert(data.error);
        }
        setIsLoading(false);
        window.location.reload();
    }

    async function handleDelete() {
        const confirmDelete = confirm("Are you sure you want to delete this resume? This action cannot be undone.");
        if (!confirmDelete) return;
        const res = await fetch(`/api/resume/${resumeId}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok || data.error) {
            alert(data.error);
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
                        <span className="rate"><i className="lni-alarm-clock"></i> ${wage} per hour</span>
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
                    <a className="btn btn-xs btn-secondary " href="#">Edit</a>
                    <button className="btn btn-xs btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}