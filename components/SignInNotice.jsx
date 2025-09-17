"use client";
import { useRouter } from "next/navigation";

export default function SignInNotice({ message = "Please sign in so you can have access to this page." }) {
    const router = useRouter();

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(135deg, #e0e7ff 0%, #fff 100%)",
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
                                background: "#f1f5ff",
                                borderRadius: "50%",
                                width: 64,
                                height: 64,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 1.5rem auto",
                                fontSize: 40,
                                color: "#6366f1",
                                fontWeight: "bold",
                            }}
                        >
                            <i className="lni lni-lock"></i>
                        </div>
                        <h3 className="card-title mb-2" style={{ color: "#222", fontWeight: 700 }}>Access Denied</h3>
                        <p className="card-text mb-4" style={{ color: "#555" }}>
                            {message}
                        </p>
                        <button
                            className="btn btn-primary px-4 py-2"
                            style={{ borderRadius: 8, fontWeight: 600, fontSize: "1.1rem" }}
                            onClick={() => router.replace('/signin')}
                        >
                            <i className="lni lni-user me-2"></i>
                            Sign In
                        </button>

                        <p className="card-text mb-2 mt-3" style={{ color: "#5e8db6ff" }}>
                            Don't have an account? <a href="/register" style={{ textDecoration: "underline", color: "#3b82f6", fontWeight: 600, fontSize: "1rem" }}>
                                <br />
                                Register here
                            </a>
                        </p>
                        <p className="card-text mb-2 mt-2" style={{ color: "#5e8db6ff", fontSize: "0.8rem" }}>
                            (Once you sign in, we`ll bring you back to the home page.)
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}
