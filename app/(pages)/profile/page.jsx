import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient.jsx";
import SignInNotice from "@/components/SignInNotice.jsx";
import { headers } from "next/headers";

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        return (
            <SignInNotice />
        )
    }
    const header = await headers();
    const cookie = header.get('cookie');

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.id}?role=${session.user.role}`,
        {
            cache: "no-store",
            headers: { cookie }
        }
    )
    const userData = await res.json();
    if (!res.ok || userData.errors) {
        redirect("/");
    }
    return <ProfilePageClient session={session} user={userData.user} />;
}