import { disconnectRedis, connectRedis } from "@/common/db/redis";
import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";

const startServer = async () => {
	await connectRedis();

	const server = app.listen(env.PORT, () => {
		const { NODE_ENV, HOST, PORT } = env;
		logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
	});

	const onCloseSignal = () => {
		logger.info("sigint received, shutting down");
		void disconnectRedis().finally(() => {
			server.close(() => {
				logger.info("server closed");
				process.exit();
			});
		});
		setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
	};

	process.on("SIGINT", onCloseSignal);
	process.on("SIGTERM", onCloseSignal);
};

void startServer().catch((error) => {
	logger.error({ error }, "Failed to start server");
	process.exit(1);
});
