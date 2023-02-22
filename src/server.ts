import fastify from "fastify";
import { env } from "./env";
import { connectDatabase } from "./database/db";
import { deviceRoutes } from "./routes/device.route";
import { measurementsRoutes } from "./routes/measurements.route";

const app = fastify();

connectDatabase();

app.register(measurementsRoutes, { prefix: "measurements" });
app.register(deviceRoutes, { prefix: "devices" });

app.addHook("preHandler", async (request) => {
	console.log(`[${request.method}] ${request.url}`);
});

app.listen({ port: env.PORT }).then(() => {
	console.log(`HTTP server running on PORT ${env.PORT}`);
});
