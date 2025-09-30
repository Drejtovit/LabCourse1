"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Forbidden({
    redirectTo = "/",
    delay = 3000,
    message = "You don’t have permission to access this page."
}) {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace(redirectTo);
        }, delay);

        return () => clearTimeout(timer); // cleanup
    }, [router, redirectTo, delay]);

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(135deg, #fee2e2 0%, #fff 100%)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div className="d-flex justify-content-center">
                <div className="card shadow-lg border-0 text-center" style={{ minWidth: 340, borderRadius: 18 }}>
                    <div className="card-body" style={{ padding: "2.5rem 2rem" }}>
                        <div
                            style={{
                                background: "#fef2f2",
                                borderRadius: "50%",
                                width: 64,
                                height: 64,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 1.5rem auto",
                                fontSize: 40,
                                color: "#b91c1c",
                                fontWeight: "bold",
                            }}
                        >
                            <i className="lni lni-lock"></i>
                        </div>
                        <h3 className="card-title mb-2" style={{ color: "#222", fontWeight: 700 }}>Access Denied</h3>
                        <p className="card-text mb-4" style={{ color: "#555" }}>
                            {message}
                        </p>
                        <p className="card-text mb-2 mt-3" style={{ color: "#5e8db6ff" }}>
                            Redirecting to the home page in {Math.round(delay / 1000)} seconds...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
