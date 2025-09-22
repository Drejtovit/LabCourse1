import Image from "next/image";

export default function ApplicationCandidate({ children, type, date, image, name, jobId, status }) {
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
                <div className="col-md-2 text-end">
                    {status === "PENDING" ? (
                        <span className={"badge bg-secondary px-3 py-2 ms-2 mt-3"}>
                            Pending
                        </span>
                    ) : status === "REJECTED" ? (
                        <span className={"badge bg-danger px-3 py-2 ms-2 mt-3"}>
                            Rejected
                        </span>
                    ) : status === "ACCEPTED" ? (
                        <span className={"badge bg-success px-3 py-2 ms-2 mt-3"}>
                            Accepted
                        </span>
                    ) : null}
                </div>
            </div>
        </div >
    )
}