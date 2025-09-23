import PageHeader from "@/components/PageHeader";
import Job from "@/components/Job";

export default function BrowseJobClient({ jobs }) {
    return (
        <>
            <PageHeader>Browse Jobs</PageHeader>
            <section className="job-browse section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            <div className="wrap-search-filter row">
                                <div className="col-lg-5 col-md-5 col-xs-12">
                                    <input type="text" className="form-control" placeholder="Keyword: Name, Tag" />
                                </div>
                                <div className="col-lg-5 col-md-5 col-xs-12">
                                    <input type="text" className="form-control" placeholder="Location: City, State, Zip" />
                                </div>
                                <div className="col-lg-2 col-md-2 col-xs-12">
                                    <button type="submit" className="btn btn-common float-right">Filter</button>
                                </div>
                            </div>
                        </div>
                        {jobs?.length === 0 ? <div className="col-12 text-center"><h4 className="text-info">There are no jobs available, please try again later!</h4></div> : null}
                        {jobs?.length > 0 && jobs?.map((job, index) => (
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