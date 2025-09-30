"use client"
import PageHeader from "@/components/PageHeader";
import Job from "@/components/Job";
import Fuse from "fuse.js";
import { useState } from "react";

export default function BrowseJobClient({ jobs }) {

    const [jobsResult, setJobsResult] = useState(jobs);
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleFiltering(e) {
        setIsLoading(true);
        e.preventDefault();
        let tmpJobs = jobs;

        if (!keyword && !location) {
            setJobsResult(jobs);
            setIsLoading(false);
            return;
        }
        if (keyword) {
            const fuse = new Fuse(tmpJobs, {
                keys: [
                    "title",
                    "description",
                    "employer.user.name",
                ],
                threshold: 0.3,
            });
            tmpJobs = fuse.search(keyword).map(result => result.item);
        }

        if (location) {
            const fuse = new Fuse(tmpJobs, {
                keys: [
                    "employer.city",
                    "employer.zip",
                    "employer.state"
                ],
                threshold: 0.3,
            });
            tmpJobs = fuse.search(location).map(result => result.item);
        }

        setJobsResult(tmpJobs);
        setIsLoading(false);
    }

    return (
        <>
            <PageHeader>Browse Jobs</PageHeader>
            <section className="job-browse section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            <div className="wrap-search-filter row">
                                <form onSubmit={handleFiltering} className="row g-3">
                                    <div className="col-lg-5 col-md-5 col-xs-12">
                                        <input type="text" className="form-control"
                                            placeholder="Keyword: Title, Description"
                                            value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-xs-12">
                                        <input type="text" className="form-control"
                                            placeholder="Location: City, State, Zip"
                                            value={location} onChange={(e) => setLocation(e.target.value)} />
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12">
                                        <button type="submit" className="btn btn-common float-right">
                                            {isLoading ? "Filtering..." : "Filter"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {jobsResult?.length === 0 ? <div className="col-12 text-center"><h4 className="text-info">There are no jobs available, please try again later!</h4></div> : null}
                        {jobsResult?.length > 0 && jobsResult?.map((job, index) => (
                            <Job
                                key={index}
                                id={job.id}
                                description={job.description}
                                location={job.employer.city + ", " + job.employer.state}
                                employer={job.employer?.user?.name}
                                type={job.type === "FULL_TIME" ? "Full Time" : job.type === "PART_TIME" ? "Part Time" : "Contract"}
                                image={job.employer?.user?.image}
                            >
                                {job.title}
                            </Job>
                        ))}
                    </div>
                </div>
            </section >
        </>
    )
}