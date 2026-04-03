import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsRoot = path.resolve(__dirname, "../uploads");
const avatarsDir = path.join(uploadsRoot, "avatars");
const coversDir = path.join(uploadsRoot, "covers");

export const ensureUploadDirectories = () => {
	fs.mkdirSync(avatarsDir, { recursive: true });
	fs.mkdirSync(coversDir, { recursive: true });
};

export const getUploadsRoot = () => uploadsRoot;

export const getAvatarsDir = () => avatarsDir;
export const getCoversDir = () => coversDir;

export const toPublicAvatarPath = (filename: string) => `/uploads/avatars/${filename}`;
export const toPublicCoverPath = (filename: string) => `/uploads/covers/${filename}`;
