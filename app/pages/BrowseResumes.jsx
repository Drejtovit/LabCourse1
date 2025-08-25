import Header from "../components/Header";
import BrowseResume from "../components/BrowseResume";
import PageHeader from "../components/PageHeader.jsx";
export default function BrowseResumes() {
  return (
    <>
      <Header></Header>
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
          <a href="#" className="btn btn-common">
            <i className="ti-angle-left"></i> prev
          </a>
        </li>
        <li>
          <a href="#">1</a>
        </li>
        <li>
          <a href="#">2</a>
        </li>
        <li>
          <a href="#">3</a>
        </li>
        <li>
          <a href="#">4</a>
        </li>
        <li>
          <a href="#">5</a>
        </li>
        <li className="active">
          <a href="#" className="btn btn-common">
            Next <i className="ti-angle-right"></i>
          </a>
        </li>
      </ul>
      {/* <!-- End Pagination --> */}
    </>
  );
}
