import { Router } from "express";
import PortfolioController from "../controllers/portfolio.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { uploadAvatar, uploadCover } from "../middleware/upload.middleware.js";

const PortfolioRouter = Router();

PortfolioRouter.get("/me", requireAuth, PortfolioController.getMyPortfolio);
PortfolioRouter.put("/me", requireAuth, PortfolioController.updateMyPortfolio);
PortfolioRouter.put(
	"/me/slug",
	requireAuth,
	PortfolioController.updateMyPublicSlug,
);
PortfolioRouter.post(
	"/me/avatar",
	requireAuth,
	uploadAvatar.single("avatar"),
	PortfolioController.uploadMyAvatar,
);
PortfolioRouter.post(
	"/me/cover",
	requireAuth,
	uploadCover.single("cover"),
	PortfolioController.uploadMyCover,
);
PortfolioRouter.get(
	"/me/versions",
	requireAuth,
	PortfolioController.listMyPortfolioVersions,
);
PortfolioRouter.get(
	"/me/versions/preview",
	requireAuth,
	PortfolioController.getMyPortfolioVersionPreview,
);
PortfolioRouter.get(
	"/me/versions/:versionId",
	requireAuth,
	PortfolioController.getMyPortfolioVersion,
);
PortfolioRouter.post(
	"/me/versions",
	requireAuth,
	PortfolioController.createMyPortfolioVersion,
);
PortfolioRouter.put(
	"/me/versions/:versionId/activate",
	requireAuth,
	PortfolioController.activateMyPortfolioVersion,
);
PortfolioRouter.put(
	"/me/versions/:versionId",
	requireAuth,
	PortfolioController.renameMyPortfolioVersion,
);
PortfolioRouter.put(
	"/me/versions/:versionId/snapshot",
	requireAuth,
	PortfolioController.updateMyPortfolioVersionSnapshot,
);
PortfolioRouter.delete(
	"/me/versions/:versionId",
	requireAuth,
	PortfolioController.deleteMyPortfolioVersion,
);
PortfolioRouter.get("/:username", PortfolioController.getPublicPortfolio);

export default PortfolioRouter;
