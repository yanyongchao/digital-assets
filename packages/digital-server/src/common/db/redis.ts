import { pino } from "pino";
import Redis from "ioredis";

import { env } from "@/common/utils/envConfig";

const redisLogger = pino({ name: "redis" });

let redisClient: Redis | null = null;

export const isRedisEnabled = env.REDIS_ENABLED && !env.isTest;

const getRedisClient = () => {
	if (!isRedisEnabled) {
		return null;
	}

	if (redisClient) {
		return redisClient;
	}

	redisClient = new Redis(env.REDIS_URL, {
		lazyConnect: true,
	});

	redisClient.on("error", (error) => {
		redisLogger.error({ error }, "Redis error");
	});

	redisClient.on("ready", () => {
		redisLogger.info("Redis ready");
	});

	redisClient.on("close", () => {
		redisLogger.info("Redis connection closed");
	});

	return redisClient;
};

export const connectRedis = async () => {
	if (!isRedisEnabled) {
		redisLogger.info("Redis disabled, skipping connection");
		return;
	}

	const client = getRedisClient();

	if (!client || client.status === "ready" || client.status === "connecting") {
		return;
	}

	await client.connect();
	redisLogger.info("Connected to Redis");
};

export const disconnectRedis = async () => {
	const client = getRedisClient();

	if (!client || client.status === "end" || client.status === "wait") {
		return;
	}

	await client.quit();
};

export const getRedis = () => getRedisClient();
