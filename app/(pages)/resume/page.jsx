import AccountManagment from "@/components/AccountManagment.jsx";
import PageHeader from "@/components/PageHeader.jsx";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
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
    } else if (session.user.role !== "CANDIDATE") {
        redirect('/');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resume/activate?candidateId=${session.user.id}`, { cache: 'no-store' });
    const resumeData = await res.json();
    const resume = resumeData?.resume;

    return (

        <>
            {!resume && <ResumeRedirect hasResume={false} message={"You don`t have a resume yet! Please create one..."} route={'/resume/create'} type={'info'} />}
            {resume && (
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
                                                    <span>
                                                        <i className="lni lni-phone-handset me-2 pt-2"></i>{(resume?.candidate?.user?.phoneNumber[0]?.number)}
                                                    </span>
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

                                        {/* TODO WORK EXPERIENCE */}
                                        <p>Work Experience</p>
                                        {resume?.experience &&
                                            (<div className="work-experence item">
                                                <h3>Work Experience</h3>
                                                <h4>UI/UX Designer</h4>
                                                <h5>Bannana INC.</h5>
                                                <span className="date">Fab 2017-Present(5year)</span>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                    Libero vero, dolores, officia quibusdam architecto sapiente
                                                    eos voluptas odit ab veniam porro quae possimus itaque,
                                                    quas! Tempora sequi nobis, atque incidunt!
                                                </p>
                                                <p>
                                                    <a href="#">4 Projects</a>
                                                </p>
                                                <h4>UI Designer</h4>
                                                <h5>Whale Creative</h5>
                                                <span className="date">Fab 2017-Present(2year)</span>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                    Libero vero, dolores, officia quibusdam architecto sapiente
                                                    eos voluptas odit ab veniam porro quae possimus itaque,
                                                    quas! Tempora sequi nobis, atque incidunt!
                                                </p>
                                                <p>
                                                    <a href="#">4 Projects</a>
                                                </p>
                                            </div>)
                                        }

                                        {/* TODO EDUCATION */}
                                        <p>Education</p>
                                        {resume?.education &&
                                            (<div className="education item">
                                                <h3>Education</h3>
                                                <h4>Massachusetts Institute Of Technology</h4>
                                                <p>Bachelor of Computer Science</p>
                                                <span className="date">2010-2014</span>
                                                <h4>Massachusetts Institute Of Technology</h4>
                                                <p>Bachelor of Computer Science</p>
                                                <span className="date">2010-2014</span>
                                            </div>)
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>

    );
}
