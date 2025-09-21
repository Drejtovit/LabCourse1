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
      <Link className="job-listings-featured" href={`/job/browse/${id}`}>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-xs-12">
            <div className="job-company-logo">
              <Image
                src={image || "/assets/img/default-avatar.png"}
                width={40}
                height={40}
                alt="avatar"
              />
            </div>
            <div className="job-details">
              <h3>{children}</h3>
              <span className="company-name">{description}</span>
              <div className="tags">
                <span>
                  <i className="lni-map-marker"></i> {location}
                </span>
                <span>
                  <i className="lni-user"></i>
                  {employer}
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-xs-12 text-right">
            <div className="tag-type">
              <span className="heart-icon">
                <i className="lni-heart"></i>
              </span>
              <span className={type}>{type}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
