import SignInNotice from "@/components/SignInNotice";
import SideBar from "@/components/SideBar";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../../../../components/DeleteButton.jsx";

export default async function DashboardUsersPage() {

    const session = await auth();
    if (!session) {
        return <SignInNotice />;
    }

    if (session?.user?.role !== "ADMIN") {
        redirect('/');
    }
    const header = await headers();
    const cookie = header.get('cookie');

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, { cache: "no-store", headers: { cookie } });
    const data = await res.json();
    if (!res.ok || data.errors) {
        redirect('/');
    }

    return (
        <>
            <div className="d-flex min-vh-100 bg-light">
                <SideBar></SideBar>

                <main className="flex-grow-1 p-4 p-md-5 mt-5 " style={{ background: "#f8f9fa" }}>
                    <div className="card shadow border-0 rounded-4 ">
                        <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                            <i className="bi bi-people-fill text-primary fs-5 me-2"></i>
                            <h6 className="mb-0 fw-semibold text-secondary">User Management</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0 table-hover table-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th className="d-none d-md-table-cell" style={{ width: "60px" }}>ID</th>
                                        <th className="d-none d-sm-table-cell">Photo</th>
                                        <th>Employer</th>
                                        <th className="d-none d-lg-table-cell">Email</th>
                                        <th className="d-none d-md-table-cell">Role</th>
                                        <th className="d-none d-lg-table-cell">Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.users?.map((user, index) => (
                                        <tr key={index}>
                                            <td className="d-none d-md-table-cell small">{user?.id}</td>
                                            <td className="d-none d-sm-table-cell">
                                                <Image
                                                    src={user?.image || "/assets/img/default-avatar.png"}
                                                    alt={user?.name}
                                                    className="rounded-circle"
                                                    width={32}
                                                    height={32}
                                                    style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Image
                                                        src={user?.image || "/assets/img/default-avatar.png"}
                                                        alt={user?.name}
                                                        className="rounded-circle me-2 d-sm-none"
                                                        width={28}
                                                        height={28}
                                                        style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                    />
                                                    <div>
                                                        <div className="fw-medium small">{user?.name}</div>
                                                        <div className="text-muted small d-lg-none">{user?.email}</div>
                                                        <div className="d-md-none">
                                                            <span className={`badge badge-sm ${user?.role === "EMPLOYER" ? "bg-primary" : "bg-secondary"} me-1`}>
                                                                {user?.role}
                                                            </span>
                                                            <span className={`badge badge-sm ${new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "bg-success" : "bg-danger"}`}>
                                                                {new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="d-none d-lg-table-cell small">{user?.email}</td>
                                            <td className="d-none d-md-table-cell">
                                                <span className={`badge ${user?.role === "EMPLOYER" ? "bg-primary" : "bg-secondary"} me-1`}>
                                                    {user?.role}
                                                </span>
                                            </td>
                                            <td className="d-none d-lg-table-cell">
                                                <span className={`badge ${new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "bg-success" : "bg-danger"}`}>
                                                    {new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <div className="btn-group" role="group">
                                                    <Link className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label="Edit User" href={`/dashboard/users/edit/${user.id}`}>
                                                        <i className="lni lni-pencil"></i>
                                                    </Link>
                                                    <DeleteButton id={user.id} classes="btn btn-sm btn-danger px-2 py-1" link="/dashboard/users" item="user"></DeleteButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/users/create" className="btn btn-info btn-sm">
                                                Create a User
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card shadow border-0 rounded-4 mt-4">
                        <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                            <i className="bi bi-people-fill text-primary fs-5 me-2"></i>
                            <h6 className="mb-0 fw-semibold text-secondary">Employer Management</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0 table-hover table-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th className="d-none d-md-table-cell" style={{ width: "60px" }}>ID</th>
                                        <th className="d-none d-sm-table-cell">Photo</th>
                                        <th>User</th>
                                        <th className="d-none d-lg-table-cell">Email</th>
                                        <th className="d-none d-md-table-cell">Location</th>
                                        <th className="d-none d-lg-table-cell">Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.users?.filter(user => user.role === "EMPLOYER").map((user, index) => (
                                        <tr key={index}>
                                            <td className="d-none d-md-table-cell small">{user?.id}</td>
                                            <td className="d-none d-sm-table-cell">
                                                <Image
                                                    src={user?.image || "/assets/img/default-avatar.png"}
                                                    alt={user?.name}
                                                    className="rounded-circle"
                                                    width={32}
                                                    height={32}
                                                    style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Image
                                                        src={user?.image || "/assets/img/default-avatar.png"}
                                                        alt={user?.name}
                                                        className="rounded-circle me-2 d-sm-none"
                                                        width={28}
                                                        height={28}
                                                        style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                    />
                                                    <div>
                                                        <div className="fw-medium small">{user?.name}</div>
                                                        <div className="text-muted small d-lg-none">{user?.email}</div>
                                                        <div className="d-md-none">
                                                            <span className="text-muted small me-2">
                                                                {user?.employer?.city}, {user?.employer?.state}
                                                            </span>
                                                            <span className={`badge badge-sm ${new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "bg-success" : "bg-danger"}`}>
                                                                {new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="d-none d-lg-table-cell small">{user?.email}</td>
                                            <td className="d-none d-lg-table-cell small">{user?.employer?.city}, {user?.employer?.state}</td>
                                            <td className="d-none d-lg-table-cell">
                                                <span className={`badge ${new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "bg-success" : "bg-danger"}`}>
                                                    {new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <div className="btn-group" role="group">
                                                    <Link className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label="Edit User" href={`/dashboard/users/edit/${user.id}`}>
                                                        <i className="lni lni-pencil"></i>
                                                    </Link>
                                                    <DeleteButton id={user.id} classes="btn btn-sm btn-danger px-2 py-1" link="/dashboard/users" item="user"></DeleteButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card shadow border-0 rounded-4 mt-4">
                        <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                            <i className="bi bi-people-fill text-primary fs-5 me-2"></i>
                            <h6 className="mb-0 fw-semibold text-secondary">Candidate Management</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0 table-hover table-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th className="d-none d-md-table-cell" style={{ width: "60px" }}>ID</th>
                                        <th className="d-none d-sm-table-cell">Photo</th>
                                        <th>Candiate</th>
                                        <th className="d-none d-lg-table-cell">Email</th>
                                        <th className="d-none d-md-table-cell">Location</th>
                                        <th className="d-none d-lg-table-cell">Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.users?.filter(user => user.role === "CANDIDATE").map((user, index) => (
                                        <tr key={index}>
                                            <td className="d-none d-md-table-cell small">{user?.id}</td>
                                            <td className="d-none d-sm-table-cell">
                                                <Image
                                                    src={user?.image || "/assets/img/default-avatar.png"}
                                                    alt={user?.name}
                                                    className="rounded-circle"
                                                    width={32}
                                                    height={32}
                                                    style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Image
                                                        src={user?.image || "/assets/img/default-avatar.png"}
                                                        alt={user?.name}
                                                        className="rounded-circle me-2 d-sm-none"
                                                        width={28}
                                                        height={28}
                                                        style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                    />
                                                    <div>
                                                        <div className="fw-medium small">{user?.name}</div>
                                                        <div className="text-muted small d-lg-none">{user?.email}</div>
                                                        <div className="d-md-none">
                                                            <span className="text-muted small me-2">
                                                                {user?.candidate?.city}, {user?.candidate?.state}
                                                            </span>
                                                            <span className={`badge badge-sm ${new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "bg-success" : "bg-danger"}`}>
                                                                {new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="d-none d-lg-table-cell small">{user?.email}</td>
                                            <td className="d-none d-lg-table-cell small">{user?.candidate?.city}, {user?.candidate?.state}</td>
                                            <td className="d-none d-lg-table-cell">
                                                <span className={`badge ${new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "bg-success" : "bg-danger"}`}>
                                                    {new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <div className="btn-group" role="group">
                                                    <Link className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label="Edit User" href={`/dashboard/users/edit/${user.id}`}>
                                                        <i className="lni lni-pencil"></i>
                                                    </Link>
                                                    <DeleteButton id={user.id} classes="btn btn-sm btn-danger px-2 py-1" link="/dashboard/users" item="user"></DeleteButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main >
            </div>
        </>
    );
}