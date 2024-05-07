import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismaClient = globalForPrisma.prisma || new PrismaClient();

export default prismaClient;

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prismaClient;
