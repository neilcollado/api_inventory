import prisma from '../utils/prismaClient';

export const getAllItems = () => prisma.item.findMany();

export const getItemById = (id: number) =>
  prisma.item.findUnique({
    where: { id },
  });

export const createItem = (data: {
    link: string,
    image?: string,
    description?: string,
    sku: string,
    case_pack: string,
    min_order: string
  }) => prisma.item.create({ data });