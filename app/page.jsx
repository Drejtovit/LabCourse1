import HowItWorks from '@/components/HowItWorks.jsx'
import Job from '@/components/Job.jsx'
import Navbar from '@/components/navbar/Navbar.jsx';
import Link from 'next/link';
import { redirect } from "next/navigation";

export default async function Home() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job/browse`, { cache: 'no-store' });

    const data = await res.json();

    if (!res.ok || data.errors) {
        redirect("/signin");
    }
    const jobs = data.jobs;



    return (
        <>
            <header id="home" className="hero-area">
                <Navbar />
                <div className="container">
                    <div className="row space-100 justify-content-center">
                        <div className="col-lg-10 col-md-12 col-xs-12">
                            <div className="contents">
                                <h2 className="head-title">Find the job that fits your life</h2>
                                <p>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere
                                    lacus, <br /> id tincidunt nisi porta sit amet. Suspendisse et sapien varius, pellentesque dui non.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section id="job-listings" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Jobs</h2>
                        <p>Hand-picked jobs featured depending on popularity and benifits</p>
                    </div>
                    <div className="row">
                        {jobs?.length === 0 ? <div className="col-12 text-center"><h4 className="text-info">There are no jobs available, please try again later!</h4></div> : null}
                        {jobs?.slice(0, 6).map((job) => (
                            <Job key={job.id}
                                description={job.description}
                                location={job.employer.city + " " + job.employer.state}
                                employer={job.employer.name}
                                type={job.type === "FULL_TIME" ? "Full Time" : job.type === "PART_TIME" ? "Part Time" : "Contract"}
                                image={job.employer?.user?.image}
                                id={job.id}>
                                {job.title}
                            </Job>
                        ))}
                        <div className="col-12 text-center mt-4">
                            <Link href="/job/browse" className="btn btn-common">Browse All Jobs</Link>
                        </div>
                    </div>
                </div>
            </section>
            <div id="browse-jobs" className="section bg-gray">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="text-wrapper">
                                <div>
                                    <h3>7,000+ Browse Jobs</h3>
                                    <p>Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on
                                        over 600,000 companies worldwide. The right job is out there.</p>
                                    <a className="btn btn-common" href="#">Search jobs</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="img-thumb">
                                <img className="img-fluid" src="assets/img/search.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HowItWorks />
        </>
    );
}
