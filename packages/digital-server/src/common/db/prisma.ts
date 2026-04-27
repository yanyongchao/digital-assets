import { PrismaClient } from "@prisma/client";

import { env } from "@/common/utils/envConfig";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		datasources: {
			db: {
				url: env.DATABASE_URL,
			},
		},
	});

if (env.isDevelopment) {
	globalForPrisma.prisma = prisma;
}