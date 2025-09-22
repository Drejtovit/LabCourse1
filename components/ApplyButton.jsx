"use client"
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ApplyButton({ jobId, candidateId, status, closingDate }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const deadline = new Date(closingDate);

    const router = useRouter();

    async function handleApply() {
        setLoading(true);
        const res = await fetch('/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ jobId: jobId, candidateId: candidateId })
        });
        const data = await res.json();
        if (!res.ok || data.errors) {
            setLoading(false);
            toast.error(data?.errors?.general || "There was an error applying for the job.", { toastId: "apply-error" });
            setSuccess(false);
            router.replace('/job/browse');
        }
        if (data.success) {
            setLoading(false);
            toast.success("Application submitted successfully.", { toastId: "apply-success" });
            setSuccess(true);
            router.refresh();
        }
    }
    return (
        <>
            {deadline < new Date() ? (
                <button className="btn btn-common" disabled
                    style={{ color: "gray" }}>Application Closed</button>
            ) : status === "ACCEPTED" ? (
                <button className="btn btn-common"
                    style={{ color: "green" }}>Application Accepted</button>
            ) : status === "REJECTED" ? (
                <button className="btn btn-common" disabled
                    style={{ color: "red" }}>Application Rejected</button>
            ) : (
                status === "PENDING" ? (
                    <button className="btn btn-common" disabled
                        style={{ color: "orange" }}>Application Pending</button>
                ) : (
                    <button className="btn btn-common" onClick={handleApply} disabled={loading || success}>
                        {loading ? "Applying..." : success ? "Applied" : "Apply Now"}
                    </button>
                ))}
        </>
    )
}