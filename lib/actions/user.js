import prisma from "@/lib/db.js";

export async function getUserProfileImage(id) {
  if (!id) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: { image: true, name: true },
  });

  if (!user) {
    return null;
  }

  return user || null;
}
