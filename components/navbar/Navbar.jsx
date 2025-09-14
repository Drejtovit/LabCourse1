import { auth } from '@/lib/auth.js';
import NavBarClient from './NavBarClient.jsx';
import { getUserProfileImage } from '@/lib/actions/user.js';

export default async function Navbar() {

    const session = await auth();
    console.log(session);
    let sessionWithImage = session;

    if (session?.user?.id) {
        const { image, name } = await getUserProfileImage(session.user.id);
        if (image) sessionWithImage = { ...session, user: { ...session.user, image, name } };
    }

    return <NavBarClient session={sessionWithImage} />;
}