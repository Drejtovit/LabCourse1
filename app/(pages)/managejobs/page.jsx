import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import JobItem from "@/components/JobItem";
import AccountManagment from "@/components/AccountManagment";
import Pagination from "@/components/Pagination";

export default function ManageJobs() {
  const jobs = [
    {
      title: "Web designer",
      location: "Manhattan, NYC",
      type: "Full-time",
      img: "",
      featured: true,
    },
    {
      title: "Web designer",
      location: "Manhattan, NYC",
      type: "Part-time",
      img: "",
      featured: true,
    },
    {
      title: "Web designer",
      location: "Manhattan, NYC",
      type: "Part-time",
      img: "",
      featured: true,
    },
    {
      title: "Web designer",
      location: "Manhattan, NYC",
      type: "Part-time",
      img: "",
      featured: true,
    },
  ];

  const jobHeaders = ["Name", "Keywords", "Candidates", "Featured"];

  return (
    <>
      <Header />
      <PageHeader>Manage Jobs</PageHeader>

      <section id="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-xs-12">
              <AccountManagment />
            </div>
            <div className="col-lg-8 col-md-8 col-xs-12">
              <div className="job-alerts-item candidates">
                <h3 className="alerts-title">Manage Jobs</h3>
                <div className="alerts-list">
                  <div className="row">
                    {jobHeaders.map((header, idx) => (
                      <div key={idx} className="col-lg-3 col-md-3 col-12">
                        <p>{header}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {jobs.map((job, index) => (
                  <JobItem key={index} {...job} />
                ))}

                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
