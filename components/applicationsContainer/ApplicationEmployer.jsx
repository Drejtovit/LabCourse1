"use client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function ApplicationEmployer({ children, name, type, date, resumeId, image, candidateId, jobId, status }) {
    const router = useRouter();

    async function handleReject() {
        let confirmReject;
        toast.warning(
            <div>
                <p className="text-danger" style={{ fontSize: "1em" }}>
                    Are you sure you want to reject this application? <br />
                    <strong style={{ fontSize: "0.87em" }}>(This action cannot be undone!)</strong>
                </p>
                <div className="mt-2">
                    <button onClick={() => { confirmReject = true; toast.dismiss(); }} className="btn btn-danger btn-xs-slim me-4 px-3 py-1">
                        Yes
                    </button>
                    <button onClick={() => { confirmReject = false; toast.dismiss(); }} className="btn btn-secondary btn-xs-slim px-3 py-1">
                        No
                    </button>
                </div>
            </div>,
            { autoClose: 15000, closeOnClick: false, toastId: `reject-application`, draggable: true, }
        );
        await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (confirmReject !== undefined) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
            setTimeout(() => {
                confirmReject = false;
                clearInterval(interval);
                resolve();
            }, 15000);
        });
        return confirmReject;
    }
    async function handleApplication({ statusButton }) {
        const status = statusButton;
        if (status !== "ACCEPTED" && status !== "REJECTED") {
            toast.error("Invalid status.", { toastId: `error-application` });
            return;
        }
        if (status === "REJECTED") {
            const confirmReject = await handleReject();
            if (!confirmReject) {
                return;
            }
        }

        const res = await fetch("/api/applications", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                candidateId: candidateId,
                status: status,
                jobId: jobId
            }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
            toast.error(data.error, { toastId: `error-application` });
        } else {
            toast.success(`Application was ${status.toLowerCase()} successfully!`, { toastId: `success-application` });
            router.refresh();
        }

    }
    return (
        <div className="applications-content">
            <div className="row">
                <div className="col-md-4">
                    <div className="thums">
                        <Image src={image || "/assets/img/default-avatar.png"} alt={children} width={60} height={60} />
                    </div>
                    <h3>{children}</h3>
                    <span>{name}</span>
                </div>
                <div className="col-md-3">
                    <p><span className={type}>{type}</span></p>
                </div>
                <div className="col-md-3">
                    <p><strong>Applied:</strong> {date}</p>
                </div>
                <div className="action-btn d-flex flex-wrap flex-md-row  mt-2 mt-md-0 justify-content-between align-items-center gap-2">
                    <div className='d-flex align-items-center gap-1'>
                        <Link className="btn btn-common btn-xs mt-2 me-2" href={`/resume/browse/${resumeId}`}>View</Link>

                        {status === "PENDING" ? (
                            <>
                                <button className="btn btn-xs mt-2 btn-success me-2"
                                    onClick={() => handleApplication({ statusButton: "ACCEPTED" })}
                                    disabled={status === "ACCEPTED" || status === "REJECTED"}>
                                    Accept
                                </button>
                                <button className="btn btn-xs mt-2 btn-danger"
                                    onClick={() => handleApplication({ statusButton: "REJECTED" })}
                                    disabled={status === "ACCEPTED" || status === "REJECTED"}>
                                    Reject
                                </button>
                            </>
                        ) : status === "ACCEPTED" ? (
                            <span className={"badge bg-success px-3 py-2 ms-2 mt-3"}>
                                Accepted
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}