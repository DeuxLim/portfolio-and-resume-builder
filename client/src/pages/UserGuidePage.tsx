import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, CheckCircle2, Compass, Rocket } from "lucide-react";

const onboardingSteps = [
	"Create your account and open the dashboard.",
	"Set your public URL slug before sharing your profile.",
	"Build content in Portfolio Builder tabs: profile, story, career, stack, layout.",
	"Save drafts often, then set one version live when ready.",
	"Open Resume Builder, resolve hard validation errors, and export PDF.",
	"Preview public output and PDF before sending applications.",
];

export default function UserGuidePage() {
	return (
		<main className="builder-v2 space-y-6 pb-20">
			<section className="v2-panel p-6 sm:p-8">
				<Badge variant="outline" className="mb-3 w-fit">
					<BookOpen className="size-3.5" />
					User Guide
				</Badge>
				<h1 className="text-4xl leading-[0.95] sm:text-5xl">
					Run the full portfolio + resume workflow with confidence.
				</h1>
				<p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
					This guide is optimized for the redesigned workspace so you can quickly understand
					publishing flow, builder structure, and export behavior.
				</p>
				<div className="mt-5 flex flex-wrap gap-2">
					<Link to="/signup" className={buttonVariants({ size: "sm" })}>
						Get started
					</Link>
					<Link to="/dashboard" className={buttonVariants({ size: "sm", variant: "outline" })}>
						Open dashboard
					</Link>
				</div>
			</section>

			<section className="grid gap-4 lg:grid-cols-3">
				{[
					{
						title: "Dashboard",
						body: "Control live URL slug, version promotion, and resume quick actions.",
						icon: Compass,
					},
					{
						title: "Portfolio Builder",
						body: "Edit profile and section content while keeping layout and preview in sync.",
						icon: Rocket,
					},
					{
						title: "Resume Builder",
						body: "Tune ATS-first structure, monitor validation, and export server-rendered PDF.",
						icon: CheckCircle2,
					},
				].map((item) => (
					<div key={item.title} className="v2-panel p-5 sm:p-6">
						<div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-primary/12 text-primary">
							<item.icon className="size-4" />
						</div>
						<h2 className="text-2xl">{item.title}</h2>
						<p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
					</div>
				))}
			</section>

			<section className="v2-panel p-6 sm:p-8">
				<div className="flex items-center gap-2">
					<Rocket className="size-4 text-primary" />
					<p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">
						ONBOARDING SEQUENCE
					</p>
				</div>
				<div className="mt-4 space-y-4">
					{onboardingSteps.map((step, index) => (
						<div key={step}>
							<div className="flex items-start gap-3">
								<div className="inline-flex size-7 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary">
									{index + 1}
								</div>
								<p className="pt-1 text-sm sm:text-base">{step}</p>
							</div>
							{index < onboardingSteps.length - 1 ? <Separator className="mt-4" /> : null}
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
