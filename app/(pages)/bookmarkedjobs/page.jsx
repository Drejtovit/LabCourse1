import BookMarkedJob from "@/components/BookMarkedJob.jsx";
import AccountManagment from "@/components/AccountManagment.jsx";
import PageHeader from "@/components/PageHeader.jsx";
import Link from "next/link";

export default function BookMarkedJobs() {
    return (
        <>
            <PageHeader>BookMarked Jobs</PageHeader>

            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            <AccountManagment type="bookmarked"></AccountManagment>
                        </div>
                        <div className="col-lg-8 col-md-6 col-xs-12">
                            <div className="job-alerts-item bookmarked">
                                <h3 className="alerts-title">Bookmarked Jobs</h3>
                                <BookMarkedJob
                                    company="AmazeSoft"
                                    location=" New Yourk, US"
                                    type="Full Time"
                                >
                                    App Developer
                                </BookMarkedJob>
                                <BookMarkedJob
                                    company="AmazeSoft"
                                    location=" New Yourk, US"
                                    type="Full Time"
                                >
                                    App Developer
                                </BookMarkedJob>
                                <BookMarkedJob
                                    company="AmazeSoft"
                                    location=" New Yourk, US"
                                    type="Full Time"
                                >
                                    App Developer
                                </BookMarkedJob>
                                <BookMarkedJob
                                    company="AmazeSoft"
                                    location=" New Yourk, US"
                                    type="Full Time"
                                >
                                    App Developer
                                </BookMarkedJob>
                                {/* Start Pagination  */}
                                <ul className="pagination">
                                    <li className="active">
                                        <Link href="#" className="btn btn-common">
                                            <i className="ti-angle-left"></i> prev
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">1</Link>
                                    </li>
                                    <li>
                                        <Link href="#">2</Link>
                                    </li>
                                    <li>
                                        <Link href="#">3</Link>
                                    </li>
                                    <li>
                                        <Link href="#">4</Link>
                                    </li>
                                    <li>
                                        <Link href="#">5</Link>
                                    </li>
                                    <li className="active">
                                        <Link href="#" className="btn btn-common">
                                            Next <i className="ti-angle-right"></i>
                                        </Link>
                                    </li>
                                </ul>
                                {/* <!-- End Pagination --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
