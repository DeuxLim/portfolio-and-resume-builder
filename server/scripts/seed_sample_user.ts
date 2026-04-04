import { loadEnv } from "../config/env.js";
import { getDb } from "../lib/db.js";
import {
	createStarterPortfolio,
	updatePortfolioByUserId,
} from "../services/portfolio.service.js";
import {
	createUser,
	getUserByEmail,
	getUserByUsername,
} from "../services/user.service.js";
import type {
	CustomSection,
	EditablePortfolio,
	ExperienceItem,
	ProjectItem,
	TechCategory,
	TimelineItem,
} from "../../shared/types/portfolio.types.js";
import { defaultPortfolioLayout } from "../../shared/defaults/portfolio.js";

const makeId = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const withIdsTimeline = (items: Omit<TimelineItem, "id">[]): TimelineItem[] =>
	items.map((item) => ({
		...item,
		id: `${makeId(item.year)}-${makeId(item.position)}`,
	}));

const withIdsExperiences = (
	items: Omit<ExperienceItem, "id">[],
): ExperienceItem[] =>
	items.map((item) => ({
		...item,
		id: `${makeId(item.role)}-${makeId(item.company)}`,
	}));

const withIdsProjects = (items: Omit<ProjectItem, "id">[]): ProjectItem[] =>
	items.map((item) => ({
		...item,
		id: makeId(item.name),
	}));

const withIdsCategories = (
	items: Omit<TechCategory, "id">[],
): TechCategory[] =>
	items.map((item) => ({
		...item,
		id: makeId(item.name),
	}));

const ensureUser = async (input: {
	email: string;
	username: string;
	fullName: string;
	password: string;
}) => {
	const existing =
		(await getUserByEmail(input.email)) ??
		(await getUserByUsername(input.username));

	if (existing) {
		return {
			id: existing.id,
			email: existing.email,
			username: existing.username,
			fullName: existing.full_name,
			created: false,
		};
	}

	const user = await createUser(input);
	await createStarterPortfolio(user);

	return { ...user, created: true };
};

const buildSamplePortfolio = (user: {
	username: string;
	email: string;
	fullName: string;
}): EditablePortfolio => {
	const avatarUrl = "/default-avatar.svg";
	const coverUrl = "/default-cover.svg";

	const customSections: CustomSection[] = [
		{
			id: "focus",
			title: "Focus Areas",
			type: "bullets",
			body: "",
			items: [
				"Product-minded engineering: pick the smallest reliable solution, ship it, measure it, then iterate.",
				"Performance + UX: fast pages, accessible UI, and predictable states (no mystery spinners).",
				"Maintainability: clear boundaries, boring architecture, and tests that prevent regressions.",
				"DX improvements: scripts, tooling, and conventions that help teams move faster with fewer bugs.",
			],
			links: [],
		},
		{
			id: "writing",
			title: "Writing & Talks",
			type: "links",
			body: "I write short internal guides and run brown-bag sessions to help teams align on practical patterns.",
			items: [],
			links: [
				{
					id: "talk-observability",
					label: "Talk: Practical Observability for Small Teams",
					url: "https://example.com/talks/observability",
				},
				{
					id: "post-db-migrations",
					label: "Post: Zero-downtime DB migrations checklist",
					url: "https://example.com/posts/zero-downtime-migrations",
				},
			],
		},
	];

	return {
		username: user.username,
		email: user.email,
		fullName: user.fullName,
		headline: "Senior Full-Stack Engineer (React, Node, MySQL) · Product + Platform",
		location: "Austin, TX (Remote-friendly)",
		experienceSummary:
			"6+ years building customer-facing web apps and internal platforms. Strong in TypeScript, API design, data modeling, and performance.",
		education:
			"BS Computer Science · Systems + HCI focus · Built capstone on real-time collaboration tools",
		availability:
			"Available for remote contract work (20-30 hrs/wk) or full-time roles focused on web platforms, developer experience, or product infrastructure.",
		phone: "+1 (512) 555-0147",
		avatarUrl,
		coverUrl,
		githubUrl: "https://github.com/averykim-dev",
		githubUsername: "averykim-dev",
		linkedinUrl: "https://www.linkedin.com/in/avery-kim-dev/",
		about: [
			"I build web products that are easy to use and easy to maintain. My default is to keep systems simple: clear data models, explicit API contracts, and frontend state that matches how users actually think.",
			"In the last few years I've led features end-to-end: designing tables and migrations, building APIs, implementing UI, and shipping observability so teams can debug production issues quickly. I care a lot about correctness (validation, auth, edge cases) because it saves time later.",
			"I'm comfortable as a generalist, but I especially enjoy performance work (query tuning, caching, render optimization) and platform work (shared components, CI pipelines, guardrails). I like mentoring and writing short docs that help teams stay aligned.",
		],
		timeline: withIdsTimeline([
			{
				year: "2026",
				position: "Senior Full-Stack Engineer",
				company: "Northwind Labs",
				note: "Led reliability and performance initiatives across a multi-tenant SaaS platform.",
			},
			{
				year: "2024",
				position: "Full-Stack Engineer",
				company: "Northwind Labs",
				note: "Shipped high-impact product features, improved CI speed, and standardized API patterns.",
			},
			{
				year: "2022",
				position: "Frontend Engineer",
				company: "Brightside Commerce",
				note: "Owned React app performance and accessibility improvements, built shared UI library.",
			},
			{
				year: "2020",
				position: "Software Engineer",
				company: "Freelance / Contract",
				note: "Built small-to-mid projects for local businesses: dashboards, booking flows, and payment integrations.",
			},
		]),
		experiences: withIdsExperiences([
			{
				role: "Senior Full-Stack Engineer",
				company: "Northwind Labs",
				period: "Jan 2026 — Present",
				highlights: [
					"Led a performance project that reduced median API latency by ~45% by redesigning hot queries, adding targeted indexes, and introducing request-level caching with safe invalidation.",
					"Built an audit-log pipeline (append-only events + admin UI) to support compliance requests and faster incident investigations; added structured logs and trace IDs end-to-end.",
					"Improved auth + permissions by introducing role-based access control (RBAC) checks at the service layer and tightening validation, preventing a class of broken edge cases and support tickets.",
					"Mentored 3 engineers through code reviews and pairing sessions; standardized patterns for pagination, filtering, and error responses across the API.",
				],
			},
			{
				role: "Full-Stack Engineer",
				company: "Northwind Labs",
				period: "Apr 2024 — Dec 2025",
				highlights: [
					"Owned a new onboarding flow with multi-step forms, server-side validation, and resumable progress; improved activation rate and reduced drop-offs on mobile.",
					"Designed and shipped a background job system for imports (CSV + API sync) with retries and partial-failure reporting so customer support could self-serve.",
					"Refactored a legacy module into smaller services with clear boundaries (controllers → service layer → database helpers), making changes safer and faster to review.",
					"Added test coverage around billing edge cases (proration, cancellations, failed payments) and built admin tooling to view invoice history and status.",
				],
			},
			{
				role: "Frontend Engineer",
				company: "Brightside Commerce",
				period: "Jun 2022 — Mar 2024",
				highlights: [
					"Built a component library (buttons, forms, tables) with accessibility defaults and consistent spacing/typography; reduced UI regressions and sped up feature delivery.",
					"Improved Core Web Vitals by optimizing bundles, lazy-loading heavy routes, and removing render-blocking assets; pages became noticeably faster on slower devices.",
					"Introduced typed API clients and consistent error handling for the frontend, reducing brittle fetch logic and simplifying state management across the app.",
				],
			},
			{
				role: "Software Engineer (Contract)",
				company: "Freelance / Contract",
				period: "Aug 2020 — May 2022",
				highlights: [
					"Delivered small web apps for real businesses: booking and scheduling, inventory dashboards, and lightweight CRM workflows.",
					"Integrated Stripe payments and transactional email; wrote clear handover docs so non-engineering owners could operate and troubleshoot common issues.",
					"Built pragmatic admin panels for content updates and reporting so clients didn’t need engineering support for everyday changes.",
				],
			},
		]),
		techCategories: withIdsCategories([
			{
				name: "Frontend",
				items: [
					"React",
					"TypeScript",
					"Vite",
					"Tailwind CSS",
					"shadcn/ui",
					"React Query",
					"React Router",
					"Accessibility (WCAG basics)",
					"Performance (Core Web Vitals)",
				],
			},
			{
				name: "Backend",
				items: [
					"Node.js",
					"Express",
					"REST API design",
					"Auth (JWT, cookies)",
					"MySQL",
					"SQL schema design",
					"Background jobs / queues",
					"File uploads",
					"Rate limiting",
				],
			},
			{
				name: "Quality",
				items: [
					"Unit tests",
					"Integration tests",
					"Contract-ish API testing",
					"CI pipelines",
					"Code review practices",
					"Linting + formatting",
				],
			},
			{
				name: "DevOps & Tools",
				items: [
					"Git + GitHub",
					"Docker (local dev + CI)",
					"Vercel",
					"Linux basics",
					"NGINX basics",
					"Postman",
					"Observability (logs, metrics, traces)",
				],
			},
		]),
		projects: withIdsProjects([
			{
				name: "Portfolio Builder (Multi-user)",
				description:
					"A portfolio generator with authentication, editor UI, versioning, and a public portfolio route per user. Focused on clean defaults and an editor that stays out of your way.",
				url: "https://example.com/projects/portfolio-builder",
			},
			{
				name: "Incident Notes",
				description:
					"A tiny internal tool for incident timelines: structured event logging, markdown notes, and exportable postmortems. Built to be fast and boring so teams actually use it.",
				url: "https://example.com/projects/incident-notes",
			},
			{
				name: "Northwind Importer",
				description:
					"A background import pipeline with retries, partial failure reporting, and audit logs. Supports CSV uploads and scheduled sync from vendor APIs.",
				url: "https://example.com/projects/importer",
			},
			{
				name: "UI Kit Playground",
				description:
					"A component and accessibility playground for teams: component variants, keyboard navigation checks, and visual regression snapshots to prevent accidental breakage.",
				url: "https://example.com/projects/ui-kit",
			},
		]),
		customSections,
		layout: { ...defaultPortfolioLayout },
		chatEnabled: true,
		geminiApiKey: "",
		hasCustomGeminiKey: false,
	};
};

const main = async () => {
	loadEnv();

	const seedUser = await ensureUser({
		email: "avery.kim@example.com",
		username: "averykim",
		fullName: "Avery Kim",
		password: "Password123!",
	});

	const sample = buildSamplePortfolio(seedUser);
	await updatePortfolioByUserId(seedUser.id, sample);

	console.log(
		[
			seedUser.created ? "Seeded new sample user." : "Updated existing sample user.",
			`email=${seedUser.email}`,
			`username=${seedUser.username}`,
			`password=Password123!`,
		].join("\n"),
	);

	await getDb().end();
};

main().catch(async (err) => {
	console.error(err);
	try {
		await getDb().end();
	} catch {
		// ignore
	}
	process.exitCode = 1;
});
