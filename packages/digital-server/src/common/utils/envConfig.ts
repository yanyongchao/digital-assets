import dotenv from "dotenv";
import { z } from "zod";

const currentNodeEnv = process.env.NODE_ENV ?? "development";
dotenv.config({ path: `.env.${currentNodeEnv}` });

const envBoolean = z.preprocess((value) => {
	if (typeof value === "string") {
		return ["1", "true", "yes", "on"].includes(value.toLowerCase());
	}
	return value;
}, z.boolean());

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("production"),

	HOST: z.string().min(1).default("localhost"),

	PORT: z.coerce.number().int().positive().default(8080),

	DATABASE_URL: z.string().min(1).default("mysql://root:root@localhost:3306/digital"),

	CORS_ORIGIN: z.string().url().default("http://localhost:8080"),

	COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(1000),

	COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(1000),

	REDIS_ENABLED: envBoolean.default(false),

	REDIS_URL: z.string().url().default("redis://localhost:6379"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error("❌ Invalid environment variables:", parsedEnv.error.format());
	throw new Error("Invalid environment variables");
}

export const env = {
	...parsedEnv.data,
	isDevelopment: parsedEnv.data.NODE_ENV === "development",
	isProduction: parsedEnv.data.NODE_ENV === "production",
	isTest: parsedEnv.data.NODE_ENV === "test",
};
