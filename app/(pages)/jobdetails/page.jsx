import Header from "@/app/components/Header.jsx";
import Job from "@/app/components/Job.jsx";

export default function JobDetails() {
    return (
        <>
            <Header />
            {/* Make it dynamic */}
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 col-xs-12">
                            <div className="breadcrumb-wrapper">
                                <div className="img-wrapper">
                                    <img src="assets/img/about/company-logo.png" alt="" />
                                </div>
                                <div className="content">
                                    <h3 className="product-title">Hiring UI Designer</h3>
                                    <p className="brand">UIDeck Inc.</p>
                                    <div className="tags">
                                        <span>
                                            <i className="lni-map-marker"></i> New York
                                        </span>
                                        <span>
                                            <i className="lni-calendar"></i> Posted 26 June, 2020
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div className="month-price">
                                <span className="year">Yearly</span>
                                <div className="price">$65,000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Detail job section */}
            <section className="job-detail section">
                <div className="container">
                    <div className="row justify-content: center;">
                        <div className="col-lg-8 col-md-12 col-xs-12">
                            <div className="content-area">
                                <h4>Job Description</h4>
                                <p>
                                    Proin gravida nibh vel velit auctor aliquet. Aenean
                                    sollicitudin, lorem quis bibendum auctor, nisi elit consequat
                                    ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet
                                    nibh vulputate cursus a sit amet mauris. Morbi umsan ipsum
                                    velit.
                                </p>
                                <p>
                                    Proin gravida nibh vel velit auctor aliquet. Aenean
                                    sollicitudin, lorem quis bibendum auctor, nisi elit consequat
                                    ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet
                                    nibh vulputate cursus a sit amet mauris. Morbi umsan ipsum
                                    velit. Nam nec tellus a odio tincidunt auctor a ornare odio.
                                </p>
                                <h5>What You Need for this Position</h5>
                                <ul>
                                    <li>- Objective-C</li>
                                    <li>- iOS SDK</li>
                                    <li>- XCode</li>
                                    <li>- Cocoa</li>
                                    <li>- ClojureScript</li>
                                </ul>
                                <h5>How To Apply</h5>
                                <p>
                                    Proin gravida nibh vel velit auctor aliquet. Aenean
                                    sollicitudin, lorem quis bibendum auctor, nisi elit consequat
                                    ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet
                                    nibh vulputate cursus a sit amet mauris.
                                </p>
                                <a href="#" className="btn btn-common">
                                    Apply job
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Featured jobs */}
            <section id="featured" className="section bg-gray pb-45">
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
        </>
    );
}
