import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

const prisma = globalForPrisma.prisma ?? new PrismaClient({log: ["query"]});

if (process.env.NODE_ENV === "development") {
    globalForPrisma.prisma = prisma;
}

export default prisma;