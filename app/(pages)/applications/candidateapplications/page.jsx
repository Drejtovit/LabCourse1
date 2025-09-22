import ApplicationCandidate from '@/components/applicationsContainer/ApplicationCandidate.jsx';
import AccountManagment from '@/components/AccountManagment';
import PageHeader from '@/components/PageHeader.jsx';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SignInNotice from "@/components/SignInNotice.jsx";
import { formatDistanceToNow } from "date-fns";



export default async function CandidateApplications() {
    const session = await auth();
    if (!session) {
        return (
            <SignInNotice />
        );
    }
    if (session.user.role !== "CANDIDATE" && session.user.role !== "ADMIN") {
        redirect("/");//Todo make a 403 notice also make other pages like this one more secure
    }
    const header = await headers();
    const cookie = header.get('cookie') || '';
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications/candidate?candidateId=${session.user.id}`, { cache: 'no-store', headers: { cookie } });

    const data = await res.json();

    if (!res.ok || data.errors) {
        redirect("/");
    }
    const applications = data?.candidateApplications?.applications;

    return (
        <>

            <PageHeader>Your Applications</PageHeader>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            <AccountManagment type="applications" />
                        </div>
                        <div className="col-lg-8 col-md-12 col-xs-12">
                            <div className="job-alerts-item">
                                <h3 className="alerts-title">View applications</h3>
                                {applications?.length > 0 &&
                                    applications?.map((application, index) => (
                                        <ApplicationCandidate key={index}
                                            type={application.job?.type === "FULL_TIME" ? "full-time" : application.job?.type === "PART_TIME" ? "part-time" : "contract"}
                                            date={formatDistanceToNow(new Date(application.appliedAt), { addSuffix: true })}
                                            image={application.job?.employer?.user?.image}
                                            name={application.job?.employer?.user?.name}
                                            jobId={application.jobId}
                                            status={application.status}>
                                            {application.job.title} Needed
                                        </ApplicationCandidate>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}