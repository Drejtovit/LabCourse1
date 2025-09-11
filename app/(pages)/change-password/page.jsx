import PageHeader from '@/components/PageHeader.jsx';
import AccountManagment from '@/components/AccountManagment.jsx';
import Link from 'next/link';

export default function ChangePassword() {
    return (
        <>
            <PageHeader>Change Password</PageHeader>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                            <AccountManagment type="password"></AccountManagment>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                            <div className="job-alerts-item">
                                <h3 className="alerts-title">Change Password</h3>
                                <form className="form">
                                    <div className="mb-3 is-empty">
                                        <label className="control-label">Old Password*</label>
                                        <input className="form-control" type="text" />
                                        <span className="material-input"></span>
                                    </div>
                                    <div className="mb-3 is-empty">
                                        <label className="control-label">New Password*</label>
                                        <input className="form-control" type="text" />
                                        <span className="material-input"></span>
                                    </div>
                                    <Link href="#" id="submit" className="btn btn-common">Save Change</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}