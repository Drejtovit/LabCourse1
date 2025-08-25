export default function Loading() {
    return (
        <div
            className="d-flex justify-content-center align-items-center bg-light"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: 9999,
            }}>
            <div
                className="spinner-grow text-info"
                role="status"
                style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

}