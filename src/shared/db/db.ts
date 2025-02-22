import { PrismaClient } from "@prisma/client";

const getPrismaClient = (() => {
  let instance: PrismaClient | undefined;

  return () => {
    if (!instance) {
      instance = new PrismaClient();
    }
    return instance;
  };
})();

export const db = getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  db.$connect().catch((err) => console.error("Prisma connection error:", err));
}

if (process.env.NODE_ENV !== "production") {
  process.on("SIGINT", async () => {
    await db.$disconnect();
    process.exit(0);
  });
}
