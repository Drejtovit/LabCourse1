import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth.js";
import { jobPermission } from "@/lib/actions/job";

export async function GET(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { success: false, errors: { general: "Authentication required." } },
                { status: 401 }
            );
        }

        const { id } = await params;

        if (!id || isNaN(parseInt(id))) {
            return NextResponse.json(
                { success: false, errors: { general: "ID is required" } },
                { status: 400 }
            );
        }

        const job = await prisma.job.findUnique({
            where: { id: parseInt(id) },
            include: {
                employer: true,
            },
        });

        if (!job) {
            return NextResponse.json(
                {
                    success: false,
                    errors: { general: "There are no jobs available." },
                },
                { status: 404 }
            );
        }
        const permissionError = await jobPermission(
            session.user.id,
            job.id,
            session.user.role
        );

        if (permissionError) return permissionError;

        return NextResponse.json({ success: true, job }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, errors: { general: error.message } },
            { status: 500 }
        );
    }
}

// export async function PUT(request, { params }) {
//     try {
//         const session = await auth();

//         if (!session) {
//             return NextResponse.json(
//                 { success: false, errors: { general: "Authentication required." } },
//                 { status: 401 }
//             );
//         }
//         const { id } = await params;
//         const resumeId = parseInt(id);
//         const permissionError = await resumePermission(
//             session.user.id,
//             resumeId,
//             session.user.role
//         );

//         if (permissionError) return permissionError;
//         const body = await request.json();

//         const errors = validateResumeData(body);

//         if (Object.keys(errors).length > 0) {
//             return NextResponse.json({ success: false, errors }, { status: 400 });
//         }

//         const { profession, age, details } = body;

//         const updatedResume = await prisma.resume.update({
//             where: { id: parseInt(id) },
//             data: {
//                 profession,
//                 age: parseInt(age, 10),
//                 details: details,
//             },
//         });

//         return NextResponse.json(
//             { success: true, message: "Resume updated successfully!" },
//             { status: 200 }
//         );
//     } catch (error) {
//         return NextResponse.json(
//             { success: false, errors: { general: error.message } },
//             { status: 500 }
//         );
//     }
// }

export async function DELETE(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { success: false, errors: { general: "Authentication required." } },
                { status: 401 }
            );
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

        return NextResponse.json(
            { success: true, message: "Job deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, errors: { general: error.message } },
            { status: 500 }
        );
    }
}
