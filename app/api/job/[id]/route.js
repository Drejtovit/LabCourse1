import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth.js";
import { jobPermission } from "@/lib/actions/job";
import { validateJobData } from "@/lib/validator/job";

export async function GET(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json({ success: false, errors: { general: "Authentication required." } }, { status: 401 });
        }

        const { id } = await params;

        if (!id || isNaN(parseInt(id))) {
            return NextResponse.json({ success: false, errors: { general: "ID is required" } }, { status: 400 });
        }

        const job = await prisma.job.findUnique({
            where: { id: parseInt(id) },
            include: {
                employer: {
                    include: {
                        user: {
                            select: { name: true, email: true }
                        }
                    }
                },
            },
        });

        if (!job) {
            return NextResponse.json({ success: false, errors: { general: "There are no jobs available." } }, { status: 404 });
        }
        const permissionError = await jobPermission(
            session.user.id,
            job.id,
            session.user.role
        );

        if (permissionError) return permissionError;

        return NextResponse.json({ success: true, job }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, errors: { general: error.message } }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json({ success: false, errors: { general: "Authentication required." } }, { status: 401 });
        }
        const { id } = await params;
        const jobId = parseInt(id);
        const permissionError = await jobPermission(
            session.user.id,
            jobId,
            session.user.role
        );

        if (permissionError) return permissionError;
        const body = await request.json();

        const errors = validateJobData(body);

        if (Object.keys(errors).length > 0) {
            return NextResponse.json({ success: false, errors }, { status: 400 });
        }

        const { title, type, description, closingDate } = body;
        const jobType = type === "full-time" ? "FULL_TIME" : type === "part-time" ? "PART_TIME" : "CONTRACT";


        await prisma.job.update({
            where: { id: jobId },
            data: {
                title,
                type: jobType,
                description,
                closingDate: new Date(closingDate)
            },
        });

        return NextResponse.json({ success: true, message: "Job updated successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, errors: { general: error.message } }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json({ success: false, errors: { general: "Authentication required." } }, { status: 401 });
        }
        const { id } = await params;


        const permissionError = await jobPermission(
            session.user.id,
            id,
            session.user.role
        );

        if (permissionError) return permissionError;


        await prisma.job.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ success: true, message: "Job deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, errors: { general: error.message } }, { status: 500 });
    }
}
