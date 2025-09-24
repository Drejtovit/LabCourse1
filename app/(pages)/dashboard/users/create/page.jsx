import SignInNotice from "@/components/SignInNotice";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import CreateUsersClient from "./CreateUsersClient.jsx";


export default async function CreateUsers() {
    const session = await auth();
    if (!session) {
        return <SignInNotice />;
    }

    if (session?.user?.role !== "ADMIN") {
        redirect('/');
    }
    return (
        <CreateUsersClient />
    );
}