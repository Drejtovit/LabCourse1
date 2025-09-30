import { auth } from '@/lib/auth.js';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import SignInNotice from '@/components/SignInNotice.jsx';
import AdminEditUser from './AdminEditUser.jsx';
import Forbidden from '@/components/Forbidden';

export default async function UserEdit({ params }) {
    const session = await auth();
    if (!session) {
        return (
            <SignInNotice />
        );
    }

    if (session.user.role !== "ADMIN") {
        return (
            <Forbidden />
        );
    }
    const header = await headers();
    const cookie = header.get('cookie');

    const { id } = await params;

    const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, { cache: "no-store", headers: { cookie } });

    const userData = await userRes.json();

    if (!userRes.ok || userData.errors) {
        redirect("/dashboard/users");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}?role=${userData.user.role}`, { cache: "no-store", headers: { cookie } });
    const fullUserData = await res.json();

    if (!res.ok || fullUserData.errors) {
        redirect("/dashboard/users");
    }
    return (
        <AdminEditUser user={fullUserData.user} />
    );
}