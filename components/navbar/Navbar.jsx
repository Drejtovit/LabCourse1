import { auth } from '@/lib/auth.js';
import NavBarClient from './NavBarClient.jsx';
import { getUserProfile } from '@/lib/actions/user.js';

export default async function Navbar() {

    const session = await auth();
    let sessionWithImage = session;

    if (session?.user?.id) {
        const image = await getUserProfile(session.user.id);
        if (image) sessionWithImage = { ...session, user: { ...session.user, image } };
    }

    return <NavBarClient session={sessionWithImage} />;
}