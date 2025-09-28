import Application from '@/components/applicationsContainer/ApplicationEmployer';
import AccountManagment from '@/components/AccountManagment';
import PageHeader from '@/components/PageHeader.jsx';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SignInNotice from "@/components/SignInNotice.jsx";
import { formatDate } from '@/lib/utils/helpers';


export default async function ManageApplications() {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications?employerId=${session.user.id}`, { cache: 'no-store', headers: { cookie } });

    const data = await res.json();

    if (!res.ok || data.errors) {
        if (data.errors.jobs && session.user.role !== "ADMIN") {
            redirect("/job/post");
        } else if (session.user.role !== "ADMIN") {
            redirect("/");
        }
    }
    const applications = data?.applications || [];

    return (
        <>

            <PageHeader>Manage Applications</PageHeader>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            <AccountManagment type="applicationsEmployer" />
                        </div>
                        <div className="col-lg-8 col-md-12 col-xs-12">
                            {session.user.role === "ADMIN" && (
                                <div className="alert alert-info" role="alert">
                                    You are logged in as admin. To view and manage applications, please
                                    create an employer account and sign in as an employer.
                                </div>
                            )}
                            <div className="job-alerts-item">
                                <h3 className="alerts-title">Manage applications</h3>
                                {applications?.length === 0 && (
                                    <div className="text-center">
                                        <p className="fw-bold fs-3">
                                            You have not created any applications yet.
                                        </p>
                                    </div>
                                )}
                                {applications?.length > 0 &&
                                    applications?.map((application, index) => (
                                        <Application key={index}
                                            name={application.candidate?.user?.name}
                                            type={application.job?.type === "FULL_TIME" ? "full-time" : application.job?.type === "PART_TIME" ? "part-time" : "contract"}
                                            date={formatDate(application.appliedAt)}
                                            resumeId={application.candidate?.resumes[0]?.id}
                                            image={application.candidate?.user?.image}
                                            candidateId={application.candidateId}
                                            jobId={application.jobId}
                                            status={application.status}>
                                            {application.job.title} Needed
                                        </Application>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}