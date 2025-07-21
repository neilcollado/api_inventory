import { prisma } from '../utils/prismaClient';

export const getAllUsers = () => prisma.user.findMany();

export const getUserByEmail = (email: string) => prisma.user.findUnique({
  where: { email },
});

export const createUser = (data: {name: string, email: string, password: string}) => prisma.user.create({ data });