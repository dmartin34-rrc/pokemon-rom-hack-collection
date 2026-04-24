import prisma from '../../../../prisma/client';

export const findUserIdByClerkId = async (
  clerkId: string,
): Promise<number | null> => {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  return user?.id ?? null;
};
