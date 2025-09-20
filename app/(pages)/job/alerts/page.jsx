import PageHeader from "@/components/PageHeader.jsx";
import AccountManagement from "@/components/AccountManagment.jsx";
import JobAlertItem from "@/components/JobAlertsItem.jsx";

const jobAlertsData = [
  {
    title: "UX Designer",
    location: "New York",
    keywords: "Design, Figma, UX",
    type: "Full Time",
    frequency: "Daily",
  },
  {
    title: "React Developer",
    location: "Remote",
    keywords: "React, JS, API",
    type: "Part Time",
    frequency: "Weekly",
  },
  // add more alerts here if you want
];

export default function JobAlerts() {
  return (
    <>

      <PageHeader>Job Alerts</PageHeader>

      <div id="content">
        <div className="container">
          <div className="row">
            {/* left sidebar */}
            <div className="col-lg-4 col-md-12 col-xs-12">
              <AccountManagement type="jobalerts" />
            </div>

            {/* main content */}
            <div className="col-lg-8 col-md-12 col-xs-12">
              <div className="job-alerts-item">
                <h3 className="alerts-title">Job Alerts</h3>

                {/* table header */}
                <div className="alerts-header">
                  <div className="row">
                    <div className="col-md-3">Title / Location</div>
                    <div className="col-md-3">Keywords</div>
                    <div className="col-md-3">Contract Type</div>
                    <div className="col-md-3">Frequency</div>
                  </div>
                </div>

                {/* list of alerts */}
                {jobAlertsData.map((alert, i) => (
                  <JobAlertItem key={i} {...alert} />
                ))}
                <br />
                {/* pagination */}
                <ul className="pagination">
                  <li className="active"><a href="#" className="btn-prev"><i className="lni-angle-left"></i> prev</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li className="active"><a href="#" className="btn-next">Next <i className="lni-angle-right"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}