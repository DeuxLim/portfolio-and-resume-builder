import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";
import multer from "multer";
import { corsOptions } from "./config/cors.js";
import registerRoutes from "./routes/routes.js";
import { ensureUploadDirectories, getUploadsRoot } from "./lib/uploads.js";

export default function createApp() {
	const app = express();
	ensureUploadDirectories();

	app.use(cors(corsOptions));
	app.use(cookieParser());
	app.use(express.json({ limit: "1mb" }));
	app.use("/uploads", express.static(path.resolve(getUploadsRoot())));

	registerRoutes(app);

	app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
		if (err instanceof multer.MulterError) {
			res.status(400).json({ message: err.message });
			return;
		}

		if (err instanceof Error && err.message === "Invalid file type.") {
			res.status(400).json({ message: "Only JPEG, PNG, WEBP, or GIF images are allowed." });
			return;
		}

		next(err);
	});

	return app;
}
