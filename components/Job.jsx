import Image from "next/image";
import Link from "next/link";

export default function Job({
  children,
  description,
  id,
  location,
  employer,
  type,
  image,
}) {
  return (
    <div className="col-lg-6 col-md-12 col-xs-12">
      <Link className="job-listings-featured" href={`/job/browse/${id}`} aria-label="View Job"
        title="View job details">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-xs-12">
            <div className="job-company-logo">
              <Image
                src={image || "/assets/img/default-avatar.png"}
                width={50}
                height={50}
                alt="avatar"
              />
            </div>
            <div className="job-details">
              <h3>Now Hiring: {children}</h3>
              <span className="company-name">
                {description?.length > 30 ? (
                  <>
                    {description?.slice(0, 30)}
                    <span style={{ fontSize: "0.85em", color: "#888" }}> ...more</span>
                  </>
                ) : (
                  description
                )}
              </span>
              <div className="tags">
                <span>
                  <i className="lni-map-marker"></i> {location}
                </span>
                <span>
                  <i className="lni-apartment"></i>
                  {employer}
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-xs-12 text-right">
            <div className="tag-type">
              <span className={type === "Full Time" ? "full-time" : type === "Part Time" ? "part-time" : "contract"}>{type}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
