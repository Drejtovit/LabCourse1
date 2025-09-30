import { auth } from '@/lib/auth.js';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import SignInNotice from '@/components/SignInNotice.jsx';
import AdminEditJob from './AdminEditJob.jsx';
import Forbidden from '@/components/Forbidden';

export default async function JobEdit({ params }) {
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job/${id}`, {
        cache: 'no-store',
        headers: { cookie }
    });

    const jobData = await res.json();
    if (!res.ok || jobData.error) {
        redirect('/dashboard/jobs');
    }
    return (
        <AdminEditJob session={session} job={jobData.job} />
    );
}