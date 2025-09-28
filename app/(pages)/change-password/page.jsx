import { auth } from '@/lib/auth.js';
import SignInNotice from '@/components/SignInNotice';
import { redirect } from 'next/navigation';
import ChangePasswordClient from './ChangePasswordClient';


export default async function ChangePassword() {

    const session = await auth();

    if (!session) {
        return (
            <SignInNotice></SignInNotice>
        );
    } else if (session.user.role !== "CANDIDATE" && session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
        redirect('/');
    }

    return (
        <ChangePasswordClient session={session} />
    )
}