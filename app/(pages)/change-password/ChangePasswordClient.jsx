"use client"
import PageHeader from '@/components/PageHeader.jsx';
import AccountManagment from '@/components/AccountManagment.jsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export default function ChangePasswordClient({ session }) {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleChangePassword(formData) {
        setLoading(true);
        const res = await fetch(`/api/user/${session.user.id}/changepassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPassword: formData.get('oldPassword'),
                newPassword: formData.get('newPassword')
            })
        });

        const data = await res.json();
        if (!res.ok || data.errors) {
            if (data?.errors?.password) {
                setErrors(data?.errors);
                setLoading(false);
            } else {
                toast.error(data?.errors?.general || 'Failed to change password', { toastId: 'error-change-password' });
                router.replace('/');
            }
        }
        if (data?.success) {
            toast.success(data?.message, { toastId: 'success-change-password' });
            setLoading(false);
            setTimeout(() => {
                router.replace('/');
            }, 1500)
        }
    }


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
                                <form className="form" onSubmit={e => {
                                    e.preventDefault();
                                    handleChangePassword(new FormData(e.target));
                                }}>
                                    <div className="mb-3 is-empty">
                                        <label className="control-label">Old Password</label>
                                        <input className="form-control"
                                            type="text"
                                            name='oldPassword'
                                            style={errors?.password ? { borderColor: "red" } : {}}
                                        />
                                    </div>
                                    <div className="mb-3 is-empty">
                                        <label className="control-label">New Password</label>
                                        <input className="form-control"
                                            type="text"
                                            name='newPassword'
                                            style={errors?.password ? { borderColor: "red" } : {}}
                                        />
                                    </div>

                                    {errors.password && <p className="text-danger">{errors.password}</p>}
                                    <button type="submit" className="btn btn-common">
                                        {loading ? 'Changing...' : 'Change Password'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}