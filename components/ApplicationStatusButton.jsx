"use client";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ApplicationStatusButton({ jobId, candidateId, newStatus, classes, children = null, disabled = false }) {
    const router = useRouter();

    async function handleStatusUpdate() {
        let confirmUpdate;
        toast.warning(
            <div>
                <p style={{ fontSize: "1em" }}>
                    Are you sure you want to change the status of this application?
                </p>
                <div className="mt-2">
                    <button onClick={() => { confirmUpdate = true; toast.dismiss(); }} className={`btn btn-${newStatus === "ACCEPTED" ? 'success' : newStatus === "REJECTED" ? 'danger' : 'warning'} btn-xs-slim me-4 px-3 py-1`}>
                        Yes, {newStatus === 'ACCEPTED' ? 'accept' : newStatus === 'REJECTED' ? 'reject' : 'hold'}
                    </button>
                    <button onClick={() => { confirmUpdate = false; toast.dismiss(); }} className="btn btn-secondary btn-xs-slim px-3 py-1">
                        Cancel
                    </button>
                </div>
            </div>,
            { autoClose: 15000, closeOnClick: false, toastId: `update-application-${jobId}-${candidateId}`, draggable: true }
        );

        await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (confirmUpdate !== undefined) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
            setTimeout(() => {
                confirmUpdate = false;
                clearInterval(interval);
                resolve();
            }, 10000);
        });

        if (!confirmUpdate) return;

        const res = await fetch('/api/applications', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jobId: jobId,
                candidateId: candidateId,
                status: newStatus
            })
        });

        const data = await res.json();

        if (!res.ok || data.errors) {
            toast.error(data.errors.general || 'Failed to update application status', { toastId: `error-update-application-${jobId}-${candidateId}` });
            router.replace('/dashboard');
            return;
        }
        toast.success(`Application ${newStatus.toLowerCase()} successfully`, { toastId: `success-update-application-${jobId}-${candidateId}` });
        router.refresh();
    }

    return (
        <button
            className={classes}
            onClick={handleStatusUpdate}
            disabled={disabled}
            type="button"
        >
            {children}
        </button>
    );
}