import ResumeEditClient from './ResumeEditClient.jsx';
import { auth } from '@/lib/auth.js';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import SignInNotice from '@/components/SignInNotice.jsx';
import Forbidden from '@/components/Forbidden';

export default async function ResumeEdit({ params }) {
    const session = await auth();
    if (!session) {
        return (
            <SignInNotice />
        );
    }

    if (session.user.role !== "CANDIDATE" && session.user.role !== "ADMIN") {
        return (
            <Forbidden />
        );
    }
    const header = await headers();
    const cookie = header.get('cookie');

    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resume/${id}`, {
        cache: 'no-store',
        headers: { cookie }
    });

    const resumeData = await res.json();
    if (!res.ok || resumeData.errors) {
        redirect('/');
    }
    if (session.user.role === "CANDIDATE" && resumeData.resume.candidateId !== session.user.id) {
        return (
            <Forbidden />
        );
    }

    return (
        <ResumeEditClient session={session} resume={resumeData.resume} />
    );
}