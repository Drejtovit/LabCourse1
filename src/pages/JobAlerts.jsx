// src/pages/JobAlerts.jsx
import Header from "../components/Header.jsx";
import PageHeader from "../components/PageHeader.jsx";
import AccountManagement from "../components/AccountManagment.jsx";
import JobAlertItem from "../components/JobAlertsItem.jsx";

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
    type: "Contract",
    frequency: "Weekly",
  },
  // add more alerts here if you want
];

export default function JobAlerts() {
  return (
    <>
      <Header />
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

                {/* pagination */}
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
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