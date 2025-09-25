import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";
import { resumePermission } from "@/lib/actions/resume.js";
import { auth } from "@/lib/auth.js";
import { validateResumeData } from "@/lib/validator/resume.js";


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

    const resume = await prisma.resume.findUnique({
      where: { id: parseInt(id) },
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
        educations: true,
        experiences: true,
        SkillsOnResumes: { include: { skill: true } },
      },
    });

    if (!resume) {
      return NextResponse.json({ success: false, errors: { general: "There are no resumes available." } }, { status: 404 });
    }

    const permissionError = await resumePermission(
      session.user.id,
      resume.id,
      session.user.role
    );

    if (permissionError) return permissionError;

    return NextResponse.json({ success: true, resume }, { status: 200 });

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
    const resumeId = parseInt(id);

    const permissionError = await resumePermission(
      session.user.id,
      resumeId,
      session.user.role
    );

    if (permissionError) return permissionError;
    const body = await request.json();

    const errors = validateResumeData(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const { profession, age, details, educations, experiences, skills } = body;

    await prisma.resume.update({
      where: { id: parseInt(id) },
      data: {
        profession,
        age: parseInt(age, 10),
        details: details,
        educations: {
          upsert: educations.map((education) => ({
            where: { id: parseInt(education.id) || 0 },
            update: {
              degree: education.degree,
              fieldOfStudy: education.fieldOfStudy,
              school: education.school,
              startDate: parseInt(education.startDate, 10),
              endDate: parseInt(education.endDate, 10) || null,
              description: education.description || null,
            },
            create: {
              degree: education.degree,
              fieldOfStudy: education.fieldOfStudy,
              school: education.school,
              startDate: parseInt(education.startDate, 10),
              endDate: parseInt(education.endDate, 10) || null,
              description: education.description || null,
            },
          })),
        },
        experiences: {
          upsert: experiences.map((experience) => ({
            where: { id: parseInt(experience.id) || 0 },
            update: {
              companyName: experience.companyName,
              professionTitle: experience.professionTitle,
              startDate: parseInt(experience.startDate, 10),
              endDate: parseInt(experience.endDate, 10) || null,
              description: experience.description || null,
            },
            create: {
              companyName: experience.companyName,
              professionTitle: experience.professionTitle,
              startDate: parseInt(experience.startDate, 10),
              endDate: parseInt(experience.endDate, 10) || null,
              description: experience.description || null,
            },
          })),
        },
        SkillsOnResumes: {
          upsert: skills
            .filter((skill) => skill.id)
            .map((skill) => ({
              where: {
                resumeId_skillId: {
                  resumeId: parseInt(id),
                  skillId: skill.id,
                },
              },
              update: {
                proficiencyLevel: parseInt(skill.proficiency, 10),
              },
              create: {
                skill: {
                  connect: { id: skill.id },
                },
                proficiencyLevel: parseInt(skill.proficiency, 10),
              },
            })),
        },
      },
    });

    for (const skill of skills.filter((skill) => !skill.id)) {
      const skillRecord = await prisma.skill.upsert({
        where: { name: skill.skillName },
        update: {},
        create: { name: skill.skillName },
      });

      await prisma.SkillsOnResumes.upsert({
        where: {
          resumeId_skillId: {
            resumeId: parseInt(id),
            skillId: skillRecord.id,
          },
        },
        update: {
          proficiencyLevel: parseInt(skill.proficiency, 10),
        },
        create: {
          resume: { connect: { id: parseInt(id) } },
          skill: { connect: { id: skillRecord.id } },
          proficiencyLevel: parseInt(skill.proficiency, 10),
        },
      });
    }

    return NextResponse.json({ success: true, message: "Resume updated successfully!" }, { status: 200 });

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

    const permissionError = await resumePermission(
      session.user.id,
      id,
      session.user.role
    );

    if (permissionError) return permissionError;

    await prisma.resume.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true, message: "Resume deleted successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, errors: { general: error.message } }, { status: 500 });
  }
}
