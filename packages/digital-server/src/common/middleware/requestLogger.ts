import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pino from "pino";
import pinoHttp from "pino-http";
import { createStream } from "rotating-file-stream";

import { env } from "@/common/utils/envConfig";

const formatDate = (dateInput: Date | number) => {
	const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const createLogger = () => {
	if (env.isTest) {
		return pino({ enabled: false });
	}

	const logDirectory = join(process.cwd(), "logs");
	mkdirSync(logDirectory, { recursive: true });

	const fileStream = createStream((time) => {
		const date = time ?? new Date();
		return `digital-server-${formatDate(date)}.log`;
	}, {
		path: logDirectory,
		interval: "1d",
		immutable: true,
		compress: "gzip",
		maxFiles: 14,
	});

	const streams: pino.StreamEntry[] = [{ stream: fileStream }];

	if (env.isDevelopment) {
		streams.push({
			stream: pino.transport({
				target: "pino-pretty",
				options: { colorize: true },
			}),
		});
	}

	return pino(
		{
			level: env.isProduction ? "info" : "debug",
		},
		pino.multistream(streams),
	);
};

const logger = createLogger();

const API_LOG_PATH_PREFIXES = ["/users", "/health-check"];

const getRequestPath = (url: string | undefined) => (url ?? "").split("?")[0];

const shouldLogApiRequest = (url: string | undefined) => {
	const path = getRequestPath(url);
	return API_LOG_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
};

const getCapturedResponseBody = (res: unknown) => {
	const response = res as { locals?: { responseBody?: unknown } };
	return response.locals?.responseBody ?? null;
};

const getLogLevel = (status: number) => {
	if (status >= StatusCodes.INTERNAL_SERVER_ERROR) return "error";
	if (status >= StatusCodes.BAD_REQUEST) return "warn";
	return "info";
};

const addRequestId = (req: Request, res: Response, next: NextFunction) => {
	const existingId = req.headers["x-request-id"] as string;
	const requestId = existingId || randomUUID();

	// Set for downstream use
	req.headers["x-request-id"] = requestId;
	res.setHeader("X-Request-Id", requestId);

	next();
};

const httpLogger = pinoHttp({
	logger,
	autoLogging: {
		ignore: (req) => !shouldLogApiRequest(req.url),
	},
	genReqId: (req) => req.headers["x-request-id"] as string,
	customLogLevel: (_req, res) => getLogLevel(res.statusCode),
	customSuccessMessage: (req) => `${req.method} ${req.url} completed`,
	customErrorMessage: (_req, res) => `Request failed with status code: ${res.statusCode}`,
	customSuccessObject: (_req, res, loggableObject) => ({
		...loggableObject,
		responseBody: getCapturedResponseBody(res),
	}),
	customErrorObject: (_req, res, _error, loggableObject) => ({
		...loggableObject,
		responseBody: getCapturedResponseBody(res),
	}),
	serializers: {
		req: (req) => ({
			method: req.method,
			url: req.url,
			id: req.id,
		}),
	},
});

const captureResponseBody = (req: Request, res: Response, next: NextFunction) => {
	if (!shouldLogApiRequest(req.originalUrl || req.url)) {
		next();
		return;
	}

	const originalSend = res.send;
	res.send = function (body) {
		res.locals.responseBody = body;
		return originalSend.call(this, body);
	};
	next();
};

export default [addRequestId, captureResponseBody, httpLogger];
