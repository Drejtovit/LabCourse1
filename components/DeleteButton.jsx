"use client";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function DeleteButton({ id, classes, children = null, link = "/", item = "", disabled = false }) {
    const router = useRouter();

    async function handleDelete() {
        let confirmDelete;
        toast.warning(
            <div>
                <p className="text-danger" style={{ fontSize: "1em" }}>
                    Are you sure you want to delete this {item} ? <br />
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
        let res;

        if (item === "application") {
            const [jobId, candidateId] = id.split("+");
            res = await fetch(`/api/${item}s`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobId, candidateId }),
            });
        } else {
            res = await fetch(`/api/${item}/${id}`, {
                method: "DELETE",
            });
        }
        const data = await res.json();

        if (!res.ok || data.errors) {
            toast.error(data.errors.general, { toastId: `error-delete-${item}` });
            router.replace(link);
            return;
        }

        toast.success(`${item.charAt(0).toUpperCase() + item.slice(1)} deleted successfully`, { toastId: `success-delete-${item}` });

        if (data.signOut) {
            await signOut({ callbackUrl: "/" });
        } else {
            router.refresh();
        }
    }

    return (
        <button className={classes} onClick={handleDelete} disabled={disabled} type="button">
            {!children ? <i className="lni lni-trash"></i> : children}
        </button>
    );
}