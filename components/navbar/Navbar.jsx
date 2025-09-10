import { auth } from '@/lib/auth.js';
import NavBarClient from './NavBarClient.jsx';

export default async function Navbar() {

    const session = await auth();

    console.log("Navbar session:", session);

    return (
        <NavBarClient session={session}></NavBarClient>
    )
}