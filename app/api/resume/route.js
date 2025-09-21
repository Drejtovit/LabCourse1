import prisma from "@/lib/db.js";
import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";
import { validateResumeData } from "@/lib/validator/resume.js";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, errors: { general: "Authentication required." } },
        { status: 401 }
      );
    }

    const body = await request.json();

    // if(session.user.id !== body.candidateId && session.user.role !== "ADMIN") {
    //   return NextResponse.json(
    //     { success: false, errors: { general: "Forbidden, you are not allowed." } },
    //     { status: 403 }
    //   );
    // } //TODO when admin

    const errors = validateResumeData(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const {
      profession,
      candidateId,
      age,
      details,
      educations,
      experiences,
      skills,
    } = body;

    const numberOfResumes = await prisma.resume.count({
      where: { candidateId },
    });
    if (numberOfResumes === 5) {
      return NextResponse.json(
        {
          success: false,
          errors: { maxResumes: "Maximum number of resumes reached" },
        },
        { status: 400 }
      );
    }
    const isActive = numberOfResumes === 0;

    const newResume = await prisma.resume.create({
      data: {
        profession,
        candidate: { connect: { candidateId } },
        age: parseInt(age, 10) || null,
        details: details || null,
        isActive,
        educations: {
          create: educations.map((education) => ({
            degree: education.degree,
            fieldOfStudy: education.fieldOfStudy,
            school: education.school,
            startDate: parseInt(education.startDate, 10),
            endDate: parseInt(education.endDate, 10) || null,
            description: education.description || null,
          })),
        },
        experiences: {
          create: experiences.map((experience) => ({
            companyName: experience.companyName,
            professionTitle: experience.professionTitle,
            startDate: parseInt(experience.startDate, 10),
            endDate: parseInt(experience.endDate, 10) || null,
            description: experience.description || null,
          })),
        },
        SkillsOnResumes: {
          create: skills.map((skill) => ({
            skill: {
              connectOrCreate: {
                where: { name: skill.skillName },
                create: { name: skill.skillName },
              },
            },
            proficiencyLevel: parseInt(skill.proficiency, 10),
          })),
        },
      },
    });

    return NextResponse.json(
      { success: true, resume: newResume },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, errors: { general: "Authentication required." } },
        { status: 401 }
      );
    }
    const url = new URL(request.url);
    const candidateId = url.searchParams.get("candidateId");

    if (!candidateId) {
      return NextResponse.json(
        { success: false, errors: { general: "Candidate ID is required" } },
        { status: 400 }
      );
    }

    const resumes = await prisma.resume.findMany({
      where: { candidateId },
      orderBy: { updatedAt: "desc" },
      include: {
        candidate: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                image: true,
                phoneNumber: {
                  select: { number: true },
                },
              },
            },
          },
        },
        educations: {
          orderBy: [{ endDate: "desc" }, { startDate: "desc" }],
        },
        experiences: {
          orderBy: [{ endDate: "desc" }, { startDate: "desc" }],
        },
        SkillsOnResumes: {
          include: { skill: true },
        },
      },
    });

    if (resumes.length === 0) {
      return NextResponse.json(
        {
          success: false,
          errors: { resume: "There are no resumes available." },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, resumes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
