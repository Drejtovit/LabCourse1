
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
            <SignInNotice />
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
                                <ApplyButton jobId={job?.id} candidateId={session?.user?.id} status={job?.applications[0]?.status} closingDate={job?.closingDate} />
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
                        <Job
                            company="MizTech"
                            state="New York"
                            employer="John Smith"
                            type="full-time"
                        >
                            Software Engineer
                        </Job>
                        <Job
                            company="Hunter Inc."
                            state="New York"
                            employer="John Smith"
                            type="part-time"
                        >
                            Graphic Designer
                        </Job>
                    </div>
                </div>
            </section>
        </>);
}
