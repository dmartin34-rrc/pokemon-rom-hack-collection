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

export const createUser = async (clerkId: string): Promise<number> => {
  const newUser = await prisma.user.create({
    data: { clerkId },
  });

  return newUser.id;
};