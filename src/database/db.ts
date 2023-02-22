import { connect } from "mongoose";
import { env } from "../env";

export const connectDatabase = () => {
	console.log("Starting connection to database...");

	connect(env.DB_URI)
		.then(() => console.log("MongoDB Atlas connected!"))
		.catch((error) => {
			console.error(
				"Error while trying to connect to MongoAtlasDB",
				error
			);
		});
};
