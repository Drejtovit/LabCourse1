import PostJobClient from './PostJobClient.jsx';
import { auth } from '@/lib/auth.js';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import SignInNotice from '@/components/SignInNotice.jsx';
import ResumeRedirect from '@/components/redirect/ResumeRedirect.jsx';

export default async function ResumeCreate() {
    const session = await auth();
    if (!session) {
        return (
            <SignInNotice />
        );
    } else if (session.user.role !== "EMPLOYER") {
        redirect('/');
    }
    const header = await headers();
    const cookie = header.get('cookie') || '';
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.id}?role=${session.user.role}`, { cache: 'no-store', headers: { cookie } });

    const userData = await res.json();
    if (!res.ok || userData.errors) {
        redirect('/');
    }

    return (
        <PostJobClient session={session} user={userData.user} />
    );
}