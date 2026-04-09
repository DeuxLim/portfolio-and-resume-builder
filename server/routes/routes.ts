import type { Express } from "express";
import AuthRouter from "./auth.routes.js";
import ChatRouter from "./chat.routes.js";
import PortfolioRouter from "./portfolio.routes.js";
import ResumeRouter from "./resume.routes.js";

export default function registerRoutes(app: Express) {
	const debugRoutes = [
		"GET /api/health",
		"GET /api/auth/session",
		"POST /api/auth/signup",
		"POST /api/auth/login",
		"POST /api/auth/logout",
		"PUT /api/portfolios/me/slug",
		"GET /api/portfolios/me",
		"PUT /api/portfolios/me",
		"GET /api/portfolios/:username",
		"POST /api/chat/send-message",
		"GET /api/resumes/me",
		"PUT /api/resumes/me",
		"GET /api/resumes/me/versions",
		"POST /api/resumes/me/versions",
		"GET /api/resumes/:username/pdf",
	];

	app.get("/api/health", (_req, res) => {
		res.json({ ok: true });
	});

	app.get("/api/routes", (_req, res) => {
		res.json({
			ok: true,
			count: debugRoutes.length,
			routes: debugRoutes,
		});
	});

	app.use("/api/auth", AuthRouter);
	app.use("/api/chat", ChatRouter);
	app.use("/api/portfolios", PortfolioRouter);
	app.use("/api/resumes", ResumeRouter);
}
