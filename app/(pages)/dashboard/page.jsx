import SignInNotice from "@/components/SignInNotice";
import DashboardPageClient from "./DashBoardPageClient";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const session = await auth();
    if (!session) {
        return <SignInNotice />;
    }

    if (session?.user?.role !== "ADMIN") {
        redirect('/');
    }

    return (<DashboardPageClient />);
}