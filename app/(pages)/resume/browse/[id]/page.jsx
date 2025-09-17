import Image from "next/image";
import { formatDate } from "@/lib/utils/helpers.js";
import SignInNotice from "@/components/SignInNotice";
import { auth } from "@/lib/auth.js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ResumeRedirect from "@/components/redirect/ResumeRedirect";

export default async function ResumeDetails({ params }) {
    const session = await auth();
    if (!session) {
        return (
            <SignInNotice />
        );
    }
    if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
        redirect('/');//TODO make a 403 notice
    }

    const { id } = await params;

    const header = await headers();
    const cookie = header.get('cookie');

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/resume/browse/${id}`,
        { cache: "no-store", headers: { cookie } }
    );
    const data = await res.json();
    if (!res.ok || data.errors) {
        return (
            <ResumeRedirect hasResume={false} message={data?.errors?.general || "There was an error fetching the resume."} route='/resume/browse' type='error' /> // TODO MAKE A 403 notice
        );
    }
    const resume = data.resume;

    return (
        <>
            <div className="page-header">
                <div className="container d-flex flex-column flex-md-row align-items-center gap-3">
                    <div className="img-wrapper flex-shrink-0">
                        <Image
                            src={resume?.candidate?.user?.image || "/assets/img/default-avatar.png"}
                            alt={resume?.candidate?.user?.name || "Candidate"}
                            width={120}
                            height={120}
                            className="rounded-circle"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="content">
                        <h2 className="mb-1 fs-4 fw-semibold">{resume?.candidate?.user?.name}</h2>
                        <p className="mb-1">
                            <i className="lni lni-briefcase me-2"></i>
                            {resume?.profession}
                        </p>
                        <p className="mb-1">
                            <i className="lni lni-envelope me-2"></i>
                            {resume?.candidate?.user?.email}
                        </p>
                        <p className="mb-1">
                            <i className="lni lni-phone-handset me-2"></i>
                            {resume?.candidate?.user?.phoneNumber[0]?.number}
                        </p>
                        <div className="tags d-flex flex-wrap gap-3 mt-2">
                            <span>
                                <i className="lni lni-map-marker me-1"></i>
                                {resume?.candidate?.city}, {resume?.candidate?.state}
                            </span>
                            <span>
                                <i className="lni lni-calendar me-1"></i>
                                Last active: {formatDate(resume?.updatedAt, false)}
                            </span>
                        </div>
                    </div>
                </div>
            </div >

            <section className="resume-detail section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-12 col-xs-12">
                            <div className="content-area">
                                <h4>Professional Summary</h4>
                                <p>{resume?.details || "No summary provided."}</p>
                                <hr className='mt-4 border border-dark border-2' />

                                <p>Education</p>
                                <p>Experience</p>
                                <p>Skills</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    );
}
