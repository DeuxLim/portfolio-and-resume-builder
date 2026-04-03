import multer from "multer";
import path from "node:path";
import { getAvatarsDir, getCoversDir } from "../lib/uploads.js";

const allowedMimeTypes = new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
]);

const extensionByMimeType: Record<string, string> = {
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
	"image/gif": "gif",
};

const avatarStorage = multer.diskStorage({
	destination: (_req, _file, callback) => {
		callback(null, getAvatarsDir());
	},
	filename: (req, file, callback) => {
		const fallbackExt = path.extname(file.originalname).replace(/^\./, "");
		const safeExt = (extensionByMimeType[file.mimetype] ?? fallbackExt) || "jpg";
		const userId = req.auth?.userId ?? "user";
		const filename = `u${userId}-${Date.now()}.${safeExt}`;
		callback(null, filename);
	},
});

const coverStorage = multer.diskStorage({
	destination: (_req, _file, callback) => {
		callback(null, getCoversDir());
	},
	filename: (req, file, callback) => {
		const fallbackExt = path.extname(file.originalname).replace(/^\./, "");
		const safeExt = (extensionByMimeType[file.mimetype] ?? fallbackExt) || "jpg";
		const userId = req.auth?.userId ?? "user";
		const filename = `c${userId}-${Date.now()}.${safeExt}`;
		callback(null, filename);
	},
});

export const uploadAvatar = multer({
	storage: avatarStorage,
	limits: {
		fileSize: 3 * 1024 * 1024,
		files: 1,
	},
	fileFilter: (_req, file, callback) => {
		if (!allowedMimeTypes.has(file.mimetype)) {
			callback(new Error("Invalid file type."));
			return;
		}

		callback(null, true);
	},
});

export const uploadCover = multer({
	storage: coverStorage,
	limits: {
		fileSize: 5 * 1024 * 1024,
		files: 1,
	},
	fileFilter: (_req, file, callback) => {
		if (!allowedMimeTypes.has(file.mimetype)) {
			callback(new Error("Invalid file type."));
			return;
		}

		callback(null, true);
	},
});
