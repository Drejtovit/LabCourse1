import BrowseResume from "@/components/BrowseResume";
import PageHeader from "@/components/PageHeader.jsx";
import Link from "next/link";
export default function BrowseResumes() {
  return (
    <>
      <PageHeader>Browse Resumes</PageHeader>
      {/* CandidateResumeCard */}

      <div id="content">
        <div className="container">
          <div className="row">
            <BrowseResume
              name="Zane Joyner"
              position="Front-end developer"
              location="Cupertino, CA, USA"
              rate="55"
              skills={["HTML5", "CSS3", "Bootstrap", "Wordpress"]}
              experience="4"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore,
              qui aspernatur accusantium! Molestiae, cum cupiditate nam optio
              dignissimos magnam velit, perspiciatis amet qui aut nobis,
              quisquam, laudantium vitae eos ipsam.
            </BrowseResume>
            <BrowseResume
              name="Bikesh Soltaniane"
              position="Java developer"
              location="Cupertino, CA, USA"
              rate="55"
              skills={["HTML5", "CSS3", "Bootstrap", "Wordpress"]}
              experience="4"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore,
              qui aspernatur accusantium! Molestiae, cum cupiditate nam optio
              dignissimos magnam velit, perspiciatis amet qui aut nobis,
              quisquam, laudantium vitae eos ipsam.
            </BrowseResume>
            <BrowseResume
              name="Zane Joyner"
              position="Front-end developer"
              location="Cupertino, CA, USA"
              rate="55"
              skills={["HTML5", "CSS3", "Bootstrap", "Wordpress"]}
              experience="4"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore,
              qui aspernatur accusantium! Molestiae, cum cupiditate nam optio
              dignissimos magnam velit, perspiciatis amet qui aut nobis,
              quisquam, laudantium vitae eos ipsam.
            </BrowseResume>
          </div>
        </div>
      </div>
      {/* Start Pagination  */}
      <ul className="pagination">
        <li className="active">
          <Link href="#" className="btn btn-common">
            <i className="ti-angle-left"></i> prev
          </Link>
        </li>
        <li>
          <Link href="#">1</Link>
        </li>
        <li>
          <Link href="#">2</Link>
        </li>
        <li>
          <Link href="#">3</Link>
        </li>
        <li>
          <Link href="#">4</Link>
        </li>
        <li>
          <Link href="#">5</Link>
        </li>
        <li className="active">
          <Link href="#" className="btn btn-common">
            Next <i className="ti-angle-right"></i>
          </Link>
        </li>
      </ul>
      {/* <!-- End Pagination --> */}
    </>
  );
}
