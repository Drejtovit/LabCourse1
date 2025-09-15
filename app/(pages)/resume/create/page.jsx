import ResumeCreateClient from './ResumeCreateClient.jsx';
import { auth } from '@/lib/auth.js';
import { redirect } from 'next/navigation';

export default async function ResumeCreate() {
    const session = await auth();
    if (!session) {
        redirect('/signin');
    } else if (session.user.role !== "CANDIDATE") {
        redirect('/');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.id}?role=${session.user.role}`, { cache: 'no-store' });

    const userData = await res.json();
    if (!res.ok || userData.error) {
        alert(userData.error);
        redirect('/');
    }

    return (
        <ResumeCreateClient session={session} user={userData.user} />
    );
}