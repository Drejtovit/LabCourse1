'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Loading from '@/app/loading';

export default function ResumeRedirect({ hasResume, message = 'There was a problem with your resume.', route = '/', type = 'info' }) {
    const router = useRouter();

    useEffect(() => {
        if (!hasResume) {
            toast[type](message, { toastId: 'resume-redirect' });
            router.replace(route);
        }
    }, [hasResume, router]);

    if (!hasResume) {
        return (
            <div >
                <Loading></Loading>
            </div>
        );
    }
    return null;
}

