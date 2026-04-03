import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CopyCheck, LayoutTemplate, Rocket, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import PortfolioMiniPreview from "@/components/Landing/PortfolioMiniPreview";

const pillars = [
	{
		title: "Fast Launch",
		description: "Go from signup to a polished developer portfolio link in minutes.",
		icon: Rocket,
	},
	{
		title: "Developer-First Editor",
		description: "Guided sections for projects, experience, skills, and links recruiters actually scan.",
		icon: LayoutTemplate,
	},
	{
		title: "Portfolio Versions",
		description: "Keep drafts for different job targets, then publish the one you want live.",
		icon: CopyCheck,
	},
];

export default function LandingPage() {
	return (
		<main className="space-y-5">
			<section className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
				<Card className="border-border/70 bg-background/80 shadow-none backdrop-blur">
					<CardHeader className="space-y-4">
						<Badge variant="secondary" className="w-fit">
							<Sparkles className="mr-1 size-3.5" />
							Developer Portfolio Generator
						</Badge>
						<CardTitle className="max-w-3xl text-3xl tracking-tight sm:text-5xl">
							Build a developer portfolio that helps you get interviews.
						</CardTitle>
						<CardDescription className="max-w-2xl text-sm sm:text-base">
							Write once, update anytime, and publish to one permanent link.
							Designed for solo developers who want a clean, modern portfolio fast.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-2">
						<Link to="/signup" className={buttonVariants({ size: "lg" })}>
							Create account
						</Link>
						<Link
							to="/sample"
							className={buttonVariants({ size: "lg", variant: "outline" })}
						>
							View sample output
						</Link>
						<Link
							to="/login"
							className={buttonVariants({ size: "lg", variant: "ghost" })}
						>
							Log in
						</Link>
					</CardContent>
				</Card>

				<Card className="border-border/70 bg-gradient-to-br from-sky-500/10 via-emerald-500/5 to-transparent shadow-none">
					<CardHeader>
						<CardTitle className="text-xl">See the output</CardTitle>
						<CardDescription>
							This is a miniature preview of the generated portfolio style.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<PortfolioMiniPreview />
						<div className="rounded-md border bg-background/90 px-3 py-2 text-sm font-medium">
							your-domain.com/your-username
						</div>
						<div className="rounded-md border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
							Your public link stays stable while you switch versions.
						</div>
						<Link
							to="/signup"
							className={cn(buttonVariants({ variant: "outline" }), "w-full")}
						>
							Start building <ArrowRight className="size-4" />
						</Link>
					</CardContent>
				</Card>
			</section>

			<section className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{pillars.map((pillar) => (
					<Card key={pillar.title} className="border-border/70 bg-background/75 shadow-none">
						<CardHeader className="gap-2">
							<pillar.icon className="size-4 text-muted-foreground" />
							<CardTitle className="text-base">{pillar.title}</CardTitle>
							<CardDescription>{pillar.description}</CardDescription>
						</CardHeader>
					</Card>
				))}
			</section>

			<section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<Card className="border-border/70 shadow-none">
					<CardHeader>
						<CardTitle className="text-lg">How it works</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3 text-sm">
						<div>Create an account and start your personal developer profile.</div>
						<Separator />
						<div>Fill guided sections for intro, experience, projects, and stack.</div>
						<Separator />
						<div>Save multiple versions and choose which one is publicly live.</div>
					</CardContent>
				</Card>
				<Card className="border-border/70 shadow-none">
					<CardHeader>
						<CardTitle className="text-lg">Why developers use this</CardTitle>
						<CardDescription>
							Clean public output + practical editing flow.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2 text-sm text-muted-foreground">
						<div className="rounded-md border px-3 py-2">Portfolio output stays consistent and professional.</div>
						<div className="rounded-md border px-3 py-2">Update content without rebuilding your site each time.</div>
						<div className="rounded-md border px-3 py-2">Easy control of what recruiters see on your live link.</div>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
