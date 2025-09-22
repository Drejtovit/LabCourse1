
import PageHeader from "@/components/PageHeader";
import JobItem from "@/components/JobItem";
import AccountManagment from "@/components/AccountManagment";
import Pagination from "@/components/Pagination";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SignInNotice from "@/components/SignInNotice.jsx";

export default async function ManageJobs() {
  const session = await auth();
  if (!session) {
    return (
      <SignInNotice />
    );
  }
  if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
    redirect("/");//Todo make a 403 notice also make other pages like this one more secure
  }
  const header = await headers();
  const cookie = header.get('cookie') || '';
  const job = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job?employerId=${session.user.id}`, { cache: 'no-store', headers: { cookie } });
  const jobData = await job.json();

  if (!job.ok || jobData.errors) {
    if (jobData.errors.jobs) {
      redirect("/job/post");
    } else {
      redirect("/");
    }
  }
  const jobs = jobData?.jobs;

  return (
    <>

      <PageHeader>Manage Jobs</PageHeader>

      <section id="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-xs-12">
              <AccountManagment type="jobs" />
            </div>
            <div className="col-lg-8 col-md-8 col-xs-12">
              <div className="job-alerts-item candidates">
                <h3 className="alerts-title">Manage Jobs</h3>
                {jobs?.length === 0 && (
                  <div className="text-center">
                    <p className="fw-bold fs-3">
                      You have not created any jobs yet.
                    </p>
                  </div>
                )}
                {jobs.map((job, index) => (
                  <JobItem key={index}
                    id={job.id}
                    title={job.title}
                    location={job.employer.zip + ", " + job.employer.city + ", " + job.employer.state}
                    type={job.type === "FULL_TIME" ? "Full-time" : job.type === "PART_TIME" ? "Part-time" : "Contract"}
                    applicationsCount={job._count?.applications}
                  />
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
