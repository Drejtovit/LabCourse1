import Header from '../components/Header.jsx';
import BookMarkedJob from '../components/BookMarkedJob.jsx';
import AccountManagment from '../components/AccountManagment.jsx';

export default function BookMarkedJobs() {

    return (
        <>
            <Header />
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>Bookmarked</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            <AccountManagment type="bookmarked"></AccountManagment>
                        </div>
                        <div className="col-lg-8 col-md-6 col-xs-12">
                            <div className="job-alerts-item bookmarked">
                                <h3 className="alerts-title">Bookmarked Jobs</h3>
                                <BookMarkedJob company='AmazeSoft' location=' New Yourk, US' type='Full Time'>App Developer</BookMarkedJob>
                                <BookMarkedJob company='AmazeSoft' location=' New Yourk, US' type='Full Time'>App Developer</BookMarkedJob>
                                <BookMarkedJob company='AmazeSoft' location=' New Yourk, US' type='Full Time'>App Developer</BookMarkedJob>
                                <BookMarkedJob company='AmazeSoft' location=' New Yourk, US' type='Full Time'>App Developer</BookMarkedJob>
                                {/* Start Pagination  */}
                                <ul className="pagination">
                                    <li className="active"><a href="#" className="btn btn-common"><i className="ti-angle-left"></i> prev</a>
                                    </li>
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li className="active"><a href="#" className="btn btn-common">Next <i
                                        className="ti-angle-right"></i></a></li>
                                </ul>
                                {/* <!-- End Pagination --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}