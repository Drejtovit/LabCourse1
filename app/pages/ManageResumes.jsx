import Header from "../components/Header.jsx";
import AccountManagment from "../components/AccountManagment.jsx";
import ResumeCard from "../components/ResumeCard.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function ManageResumes() {

    return (
        <>
            <Header />
            <PageHeader>Manage Resumes</PageHeader>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-xs-12">
                        <AccountManagment type='resumes'></AccountManagment>
                        </div>
                        <div className="col-lg-8 col-md-12 col-xs-12">
                            <div className="job-alerts-item candidates">
                                <h3 className="alerts-title">Manage Resumes</h3>
                                <ResumeCard name='Zane Joyner' specialization='Front-end developer' wage="55" status="Fab 22, 2020" location="Cupertino, CA, USA"></ResumeCard>
                                <ResumeCard name='Zane Joyner' specialization='Front-end developer' wage="55" status="Fab 22, 2020" location="Cupertino, CA, USA"></ResumeCard>
                                <ResumeCard name='Zane Joyner' specialization='Front-end developer' wage="55" status="Fab 22, 2020" location="Cupertino, CA, USA"></ResumeCard>
                                <ResumeCard name='Zane Joyner' specialization='Front-end developer' wage="55" status="Fab 22, 2020" location="Cupertino, CA, USA"></ResumeCard>
                                <a className="btn btn-common btn-sm" href="add-resume.html">Add new resume</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}