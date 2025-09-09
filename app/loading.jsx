export default function Loading() {
    return (
        <div className="position-fixed top-0 start-0 vw-100 vh-100 d-flex justify-content-center align-items-center bg-light" style={{ zIndex: 9999 }}>
            <div className="spinner-grow text-info" role="status" style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
