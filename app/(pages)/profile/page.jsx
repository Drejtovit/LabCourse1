import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient.jsx";
import { getUserProfile } from "@/lib/actions/user.js";

export default async function ProfilePage() {
    const session = await auth();
    console.log(session);
    if (!session) {
        redirect("/signin");
    }

    const image = await getUserProfile(session.user.id);

    return <ProfilePageClient session={{ ...session, user: { ...session.user, image } }} />;
}