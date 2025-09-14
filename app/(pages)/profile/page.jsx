import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient.jsx";

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        redirect("/signin");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${session.user.id}?role=${session.user.role}`,
        {
            cache: "no-store",
        }
    )
    const userData = await res.json();
    if (!res.ok || userData.error) {
        alert(userData.error);
        redirect("/");
    }
    console.log(userData.user);
    return <ProfilePageClient session={session} user={userData.user} />;
}