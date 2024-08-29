import { PrismaClient } from "@prisma/client";

// Handle the global Prisma client instance to avoid multiple instances in development
const globalForPrisma = globalThis;

// Create a new PrismaClient instance or reuse the existing one
const prisma = globalForPrisma.prisma || new PrismaClient();

// In development mode, store the Prisma client globally to avoid creating multiple instances
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
