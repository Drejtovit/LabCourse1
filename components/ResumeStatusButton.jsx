"use client";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ResumeStatusButton({ resumeId, candidateId, newStatus, classes, children = null, disabled = false }) {
    const router = useRouter();
    async function handleStatusUpdate() {
        let confirmUpdate;
        toast.warning(
            <div>
                <p style={{ fontSize: "1em" }}>
                    Are you sure you want to change the status of this resume?
                </p>
                <div className="mt-2">
                    <button onClick={() => { confirmUpdate = true; toast.dismiss(); }} className={`btn btn-${newStatus ? 'success' : 'warning'} btn-xs-slim me-4 px-3 py-1`}>
                        Yes, {newStatus ? 'activate' : 'inactivate'}
                    </button>
                    <button onClick={() => { confirmUpdate = false; toast.dismiss(); }} className="btn btn-secondary btn-xs-slim px-3 py-1">
                        Cancel
                    </button>
                </div>
            </div>,
            { autoClose: 15000, closeOnClick: false, toastId: `update-resume-${resumeId}-${candidateId}`, draggable: true }
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

        const res = await fetch('/api/resume/activate', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                resumeId: resumeId,
                candidateId: candidateId,
                newStatus: newStatus
            })
        });

        const data = await res.json();

        if (!res.ok || data.errors) {
            toast.error(data.errors.general || 'Failed to update resume status', { toastId: `error-update-resume-${resumeId}-${candidateId}` });
            router.replace('/dashboard');
            return;
        }
        toast.success(`Resume ${newStatus ? 'activated' : 'inactivated'} successfully`, { toastId: `success-update-resume-${resumeId}-${candidateId}` });
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