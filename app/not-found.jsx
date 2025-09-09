import Link from "next/link"

export default function NotFound() {
  return (
    <div className="custom-bg d-flex align-items-center justify-content-center px-2 position-fixed top-0 start-0 vw-100 vh-100 " style={{ zIndex: 9999 }}>
      <div className="text-center">
        <h1 className="display-1 fw-bold text-dark">404</h1>
        <p className="fs-2 fw-semibold mt-4 text-dark">Oops! Page not found</p>
        <p className="mt-4 mb-3 text-dark fw-medium">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn btn-dark fw-semibold rounded-pill px-4 py-2 custom-btn"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
