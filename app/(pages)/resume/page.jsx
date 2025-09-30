import AccountManagment from "@/components/AccountManagment.jsx";
import PageHeader from "@/components/PageHeader.jsx";
import Image from "next/image";
import { auth } from "@/lib/auth";
import Forbidden from '@/components/Forbidden';
import ResumeRedirect from "@/components/redirect/ResumeRedirect.jsx";
import SignInNotice from "@/components/SignInNotice.jsx";

export default async function Resume() {
    const session = await auth();
    if (!session) {
        return (
            <div>
                <SignInNotice />
            </div>
        )
    } else if (session.user.role !== "CANDIDATE" && session.user.role !== "ADMIN") {
        return (
            <Forbidden />
        );
    }


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resume/activate?candidateId=${session.user.id}`, { cache: 'no-store' });
    const resumeData = await res.json();
    const resume = resumeData?.resume;

    return (

        <>
            <PageHeader>Resume</PageHeader>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-xs-12">
                            <AccountManagment type="resume" />
                        </div>
                        <div className="col-lg-8 col-md-8 col-xs-12">
                            <div className="inner-box my-resume">
                                <div className="author-resume pb-3">
                                    {session.user.role === "ADMIN" && (
                                        <div className="alert alert-info" role="alert">
                                            You are logged in as admin. To create and manage resumes, please
                                            create a candidate account and sign in as a candidate.
                                        </div>
                                    )}
                                    <div className="thumb">
                                        <Image src={resume?.candidate?.user?.image || "/assets/img/default-avatar.png"} alt="Author Image" width={120} height={120} />
                                    </div>
                                    <div className="author-info">
                                        <h3>{resume?.candidate?.user?.name}</h3>
                                        <p className="sub-title">{resume?.profession}</p>
                                        <p>
                                            <span className="address me-4">
                                                <i className="lni-map-marker me-2"></i>{resume?.candidate?.city + ", " + resume?.candidate?.state + "," + resume?.candidate?.zip}{" "}
                                            </span>
                                            {resume?.candidate?.user?.phoneNumber &&
                                                resume?.candidate?.user?.phoneNumber.map((phone, index) => (
                                                    <span key={index} className="me-4">
                                                        <i className="lni lni-phone-handset me-2 pt-2"></i>{phone.number}
                                                    </span>
                                                ))}
                                            <br />
                                            <span><i className="lni lni-envelope me-2"></i>{(resume?.candidate?.user?.email)}</span>
                                        </p>
                                    </div>
                                </div>

                                {resume?.details &&
                                    (<div className="about-me item">
                                        <h3>About Me</h3>
                                        <p>
                                            {resume?.details}
                                        </p>
                                    </div>)
                                }

                                {resume?.experiences &&
                                    <div className="work-experience item">
                                        <h3>Work Experience</h3>
                                        {resume?.experiences.map((experience) => (
                                            <div key={experience.id}>
                                                <h4><i className="lni lni-briefcase me-2" style={{
                                                    opacity: '0.6'
                                                }}></i>{experience?.professionTitle}</h4>
                                                <h5><i className="lni lni-apartment me-2" style={{
                                                    opacity: '0.6'
                                                }}></i>{experience?.companyName}</h5>
                                                <span className="date"><i className="lni lni-calendar me-2"></i>{experience?.startDate} - {experience?.endDate ? experience?.endDate : 'Present'}</span>
                                                {experience?.description && <p>{experience?.description}</p>}
                                                <hr className="border border-dark" />
                                            </div>
                                        ))}
                                    </div>}

                                {resume?.educations && <div className="education item">
                                    <h3>Education</h3>
                                    {resume?.educations.map((education) => (
                                        <div key={education.id}>
                                            <h4><i className="lni lni-graduation me-2" style={{
                                                opacity: '0.6'
                                            }}></i>{education?.school}</h4>
                                            <p><i className="lni lni-book me-2"></i>{education?.degree} {education?.fieldOfStudy ? 'in' : ''} {education?.fieldOfStudy}</p>
                                            <span className="date"><i className="lni lni-calendar me-2"></i>{education?.startDate} - {education?.endDate ? education?.endDate : 'Present'} </span>
                                            <hr className="border border-dark" />
                                        </div>))
                                    }
                                </div>}
                                {resume?.SkillsOnResumes?.length > 0 && (
                                    <div className="skills item">
                                        <h3>Skills</h3>
                                        {resume?.SkillsOnResumes?.map((s, index) => (
                                            <span key={index} className="me-2 badge bg-secondary px-4 py-2 mb-1">
                                                {s.skill.name + ": " + s.proficiencyLevel + "%"}</span>
                                        ))}
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {(!resume && session.user.role === "CANDIDATE") && <ResumeRedirect hasResume={false} message={"You don`t have a resume yet! Please create one..."} route={'/resume/create'} type={'info'} />}
        </>

    );
}
