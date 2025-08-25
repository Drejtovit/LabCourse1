import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Job from "@/components/Job";

export default function BrowseJobs() {
    return (
        <>
            <Header></Header>
            <PageHeader>Browse Jobs</PageHeader>
            <section className="job-browse section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            <div className="wrap-search-filter row">
                                <div className="col-lg-5 col-md-5 col-xs-12">
                                    <input type="text" className="form-control" placeholder="Keyword: Name, Tag"/>
                                </div>
                                <div className="col-lg-5 col-md-5 col-xs-12">
                                    <input type="text" className="form-control" placeholder="Location: City, State, Zip"/>
                                </div>
                                <div className="col-lg-2 col-md-2 col-xs-12">
                                    <button type="submit" className="btn btn-common float-right">Filter</button>
                                </div>
                            </div>
                        </div>
                        <Job
                            company="MizTech"
                            location="New York"
                            employer="John Smith"
                            type="full-time"
                        >
                            Software Engineer
                        </Job>
                        <Job
                            company="Hunter Inc."
                            location="New York"
                            employer="John Smith"
                            type="part-time"
                        >
                            Graphic Designer
                        </Job>
                        <Job
                            company="MagNews"
                            location="New York"
                            employer="John Smith"
                            type="full-time"
                        >
                            Managing Director
                        </Job>
                        <Job
                            company="AmazeSoft"
                            location="New York"
                            employer="John Smith"
                            type="full-time"
                        >
                            Software Engineer
                        </Job>
                        <Job
                            company="MagNews"
                            location="New York"
                            employer="John Smith"
                            type="part-time"
                        >
                            Managing Director
                        </Job>
                        <Job
                            company="Bingo"
                            location="New York"
                            employer="John Smith"
                            type="full-time"
                        >
                            Graphic Designer
                        </Job>
                    </div>
                </div>
            </section>
        </>
    )
}