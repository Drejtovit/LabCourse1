import Job from "@/components/Job.jsx";
import Image from "next/image";
import { formatDate } from "@/lib/utils/helpers.js";
import SignInNotice from "@/components/SignInNotice";
import { auth } from "@/lib/auth.js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import ApplyButton from "@/components/ApplyButton.jsx";

export default async function JobDetails({ params }) {
    const session = await auth();
    if (!session) {
        return (
            <SignInNotice message="Please sign in as candidate to view and apply for jobs." />
        );
    }
    if (session.user.role !== "CANDIDATE" && session.user.role !== "ADMIN") {
        redirect('/');//TODO make a 403 notice
    }

    const { id } = await params;

    const header = await headers();
    const cookie = header.get('cookie');

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/job/browse/${id}`,
        { cache: "no-store", headers: { cookie } }
    );
    const data = await res.json();
    if (!res.ok || data.errors) {
        redirect('/job/browse');
    }
    const job = data.job;

    const hasResume = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.id}?role=CANDIDATE`, { cache: "no-store", headers: { cookie } });
    const hasResumeData = await hasResume.json();
    if (!hasResume.ok || hasResumeData.errors) {
        redirect('/job/browse');
    }
    console.log(hasResumeData?.user?.candidate?.resumes[0]?.isActive);

    const similarJobs = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job/browse`,
        { cache: "no-store" });

    const similarJobsData = await similarJobs.json();
    if (!similarJobs.ok || similarJobsData.errors) {
        redirect('/job/browse');
    }
    const similarJobsList = similarJobsData.jobs;

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 col-xs-12">
                            <div className="breadcrumb-wrapper">
                                <div className="img-wrapper">
                                    <Image
                                        src={job?.employer?.user?.image || "/assets/img/default-avatar.png"}
                                        alt={job?.employer?.user?.name}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className="content">
                                    <h3 className="product-title">Hiring {job?.title}</h3>
                                    <p className="brand">{job?.employer?.user?.name}</p>
                                    <div className="tags">
                                        <span>
                                            <i className="lni-map-marker"></i> {job?.employer?.city}, {job?.employer?.state}
                                        </span>
                                        <br />
                                        <span >
                                            <i className="lni-calendar"></i> Posted: {formatDate(job?.createdAt, false)} ({formatDistanceToNow(job?.createdAt, { addSuffix: true })})
                                        </span>
                                        <br />
                                        <span>
                                            <i className="lni-timer"></i> Closing Date: {formatDate(job?.closingDate, false)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            < section className="job-detail section" >
                <div className="container">
                    <div className="row justify-content: center;">
                        <div className="col-lg-8 col-md-12 col-xs-12">
                            <div className="content-area">
                                <h4>Job Description</h4>
                                {job?.description && (
                                    <p>{job?.description}</p>
                                )}
                                <h5>How To Apply</h5>
                                <p>
                                    Proin gravida nibh vel velit auctor aliquet. Aenean
                                    sollicitudin, lorem quis bibendum auctor, nisi elit consequat
                                    ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet
                                    nibh vulputate cursus a sit amet mauris.
                                </p>
                                <ApplyButton jobId={job?.id} candidateId={session?.user?.id} status={job?.applications[0]?.status} closingDate={job?.closingDate} hasResume={hasResumeData?.user?.candidate?.resumes[0]?.isActive} />
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* Featured jobs */}
            <section className="section bg-gray pb-45" >
                <div className="container">
                    <h4 className="small-title text-left">Similar Jobs</h4>
                    <div className="row">
                        {similarJobsList?.length === 0 && (
                            <p className="text-info">No similar jobs found.</p>
                        )}
                        {similarJobsList.slice(0, 3).filter(similarJob => similarJob.id !== job.id).map((similarJob, index) => (
                            <Job
                                key={index}
                                id={similarJob.id}
                                description={similarJob.description}
                                location={similarJob.employer.city + ", " + similarJob.employer.state}
                                employer={similarJob.employer?.user?.name}
                                type={similarJob.type === "FULL_TIME" ? "Full Time" : similarJob.type === "PART_TIME" ? "Part Time" : "Contract"}
                                image={similarJob.employer?.user?.image}
                            >
                                {similarJob.title}
                            </Job>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
