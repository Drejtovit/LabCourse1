import HowItWorks from '@/components/HowItWorks.jsx'
import Category from '@/components/Category.jsx'
import Job from '@/components/Job.jsx'
import LatestJobsSection from '@/components/LatestJobsSection.jsx';
import Navbar from '@/components/navbar/Navbar.jsx';
import Link from 'next/link';

export default function Home() {
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
                                <div className="job-search-form">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-5 col-md-6 col-xs-12">
                                                <div className="form-group">
                                                    <input className="form-control" type="text" placeholder="Job Title or Company Name" />
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-xs-12">
                                                <div className="form-group">
                                                    <div className="search-category-container">
                                                        <label className="styled-select">
                                                            <select>
                                                                <option value="none">Locations</option>
                                                                <option value="none">New York</option>
                                                                <option value="none">California</option>
                                                                <option value="none">Washington</option>
                                                                <option value="none">Birmingham</option>
                                                                <option value="none">Chicago</option>
                                                                <option value="none">Phoenix</option>
                                                            </select>
                                                            <i className="lni-map-marker"></i>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-3 col-md-6 col-xs-12">
                                                <div className="form-group">
                                                    <div className="search-category-container">
                                                        <label className="styled-select">
                                                            <select>
                                                                <option>All Categories</option>
                                                                <option>Finance</option>
                                                                <option>IT & Engineering</option>
                                                                <option>Education/Training</option>
                                                                <option>Art/Design</option>
                                                                <option>Sale/Markting</option>
                                                                <option>Healthcare</option>
                                                                <option>Science</option>
                                                                <option>Food Services</option>
                                                            </select>
                                                            <i className="lni-layers"></i>
                                                        </label>
                                                    </div>

                                                </div>
                                            </div> */}
                                            <div className="col-lg-1 col-md-6 col-xs-12">
                                                <button type="submit" className="button"><i className="lni-search"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Listings Section Start */}
            <section id="job-listings" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Jobs</h2>
                        <p>Hand-picked jobs featured depending on popularity and benifits</p>
                    </div>
                    <div className="row">
                        <Job company="MizTech" location="New York" employer="John Smith" type="full-time">
                            Software Engineer
                        </Job>
                        <Job company="Hunter Inc." location="New York" employer="John Smith" type="part-time">
                            Graphic Designer
                        </Job>
                        <Job company="MagNews" location="New York" employer="John Smith" type="full-time">
                            Managing Director
                        </Job>
                        <Job company="AmazeSoft" location="New York" employer="John Smith" type="full-time">
                            Software Engineer
                        </Job>
                        <Job company="MagNews" location="New York" employer="John Smith" type="part-time">
                            Managing Director
                        </Job>
                        <Job company="Bingo" location="New York" employer="John Smith" type="full-time">
                            Graphic Designer
                        </Job>
                        <div className="col-12 text-center mt-4">
                            <Link href="/browsejobs" className="btn btn-common">Browse All Jobs</Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* Listings Section End */}

            {/* Browse jobs Section Start */}
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
            {/* Browse jobs Section End */}

            {/* How It Work Section Start */}
            <HowItWorks />
            {/* How It Work Section End */}

            {/* Latest Section Start */}
            <section id="latest-jobs" className="section bg-gray">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Latest Jobs</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et  metus effici turac
                            fringilla lorem facilisis.</p>
                    </div>
                    <div className="row">
                        <LatestJobsSection company="MizTech" state="New York" employer="John Smith" type="full-time">
                            Software Engineer
                        </LatestJobsSection>
                        <LatestJobsSection company="Hunter Inc." state="New York" employer="John Smith" type="part-time">
                            Graphic Designer
                        </LatestJobsSection>
                        <LatestJobsSection company="MagNews" state="New York" employer="John Smith" type="full-time">
                            Managing Director
                        </LatestJobsSection>
                        <LatestJobsSection company="AmazeSoft" state="New York" employer="John Smith" type="full-time">
                            Software Engineer
                        </LatestJobsSection>
                        <LatestJobsSection company="MagNews" state="New York" employer="John Smith" type="part-time">
                            Managing Director
                        </LatestJobsSection>
                        <LatestJobsSection company="Bingo" state="New York" employer="John Smith" type="full-time">
                            Graphic Designer
                        </LatestJobsSection>
                        <div className="col-12 text-center mt-4">
                            <Link href="/browsejobs" className="btn btn-common">Browse All Jobs</Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* Latest Section End */}
        </>
    );
}
