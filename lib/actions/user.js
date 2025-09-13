import prisma from "@/lib/db.js";

export async function getUserProfile(id) {
  if (!id) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: { image: true },
  });

  if (!user) {
    return null;
  }

  return user.image || null;
}
