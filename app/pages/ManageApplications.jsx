import Header from '../components/Header';
import Application from '../components/Application';
import AccountManagment from '../components/AccountManagment';
import PageHeader from '../components/PageHeader.jsx';
import Pagination from '../components/Pagination.jsx';
export default function ManageApplications() {

    return (
        <>
            <Header />
            <PageHeader>Manage Applications</PageHeader>
            <div id="content">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-12 col-xs-12">
                    <AccountManagment type="applications"/>
                </div>
                <div className="col-lg-8 col-md-12 col-xs-12">
                    <div className="job-alerts-item">
                        <h3 className="alerts-title">Manage applications</h3>
                        <Application company="Quick Studio" type="full-time" date="12/12/2023" status="Pending">Web Designer Needed</Application>
                        <Application company="Quick Studio" type="part-time" date="12/12/2023" status="Rejected">Front-end developer needed</Application>
                        <Application company="Quick Studio" type="full-time" date="12/12/2023" status="Pending">We're looking for an Art Director</Application>
                        <Application company="Quick Studio" type="part-time" date="12/12/2023" status="Approved">Web designer needed</Application>
                        
                       <Pagination />
                    </div>
                </div>
            </div>
        </div>
    </div>

        </>
    )
}