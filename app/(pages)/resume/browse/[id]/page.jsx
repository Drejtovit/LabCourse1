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
            <SignInNotice message="Please sign in as employer to view this resume." />
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
                        {resume?.candidate?.user?.phoneNumber.map((phone, index) => (
                            <p className="mb-1" key={index}>
                                <i className="lni lni-phone-handset me-2"></i>
                                {phone.number}
                            </p>
                        ))}
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

                                {resume?.experiences ?
                                    (
                                        <div className="work-experience item">
                                            <h4>Work Experience</h4>
                                            {resume?.experiences.map((experience) => (
                                                <div key={experience.id}>
                                                    <p><i className="lni lni-briefcase me-2" style={{
                                                        opacity: '0.6'
                                                    }}></i>{experience?.professionTitle}</p>
                                                    <p><i className="lni lni-apartment me-2" style={{
                                                        opacity: '0.6'
                                                    }}></i>{experience?.companyName}</p>
                                                    <span className="date"><i className="lni lni-calendar me-2"></i>{experience?.startDate} - {experience?.endDate ? experience?.endDate : 'Present'} {experience?.endDate ? " (" + experience?.endDate - experience?.startDate + " years)" : ""}</span>
                                                    {experience?.description && <p>{experience?.description}</p>}
                                                    <hr className="border border-dark" />
                                                </div>
                                            ))}
                                        </div>) : <p>No work experience provided.</p>}

                                {resume?.educations ?
                                    (<div className="education item">
                                        <h4>Education</h4>
                                        {resume?.educations.map((education) => (
                                            <div key={education.id}>
                                                <p><i className="lni lni-graduation me-2" style={{
                                                    opacity: '0.6'
                                                }}></i>{education?.school}</p>
                                                <p><i className="lni lni-book me-2"></i>{education?.degree} {education?.fieldOfStudy ? 'in' : ''} {education?.fieldOfStudy}</p>
                                                <span className="date"><i className="lni lni-calendar me-2"></i>{education?.startDate} - {education?.endDate ? education?.endDate : 'Present'} </span>
                                                <hr className="border border-dark" />
                                            </div>))
                                        }
                                    </div>) : <p>No education provided.</p>}

                                {resume?.SkillsOnResumes?.length > 0 ? (
                                    <div className="skills item">
                                        <h4>Skills</h4>
                                        {resume?.SkillsOnResumes?.map((s, index) => (
                                            <span key={index} className="me-2 badge bg-secondary px-4 py-2 mb-1">
                                                {s.skill.name + ": " + s.proficiencyLevel + "%"}</span>
                                        ))}
                                    </div>
                                ) : <p>No skills listed.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    );
}
