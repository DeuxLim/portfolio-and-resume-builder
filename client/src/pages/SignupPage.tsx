import { api } from "@/lib/axios.client";
import { sessionQueryKey } from "@/hooks/useSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Rocket } from "lucide-react";

export default function SignupPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [form, setForm] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const signupMutation = useMutation({
		mutationFn: async () => {
			const { data } = await api.post("/auth/signup", form);
			return data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: sessionQueryKey });
			navigate("/dashboard");
		},
		onError: (error: unknown) => {
			if (
				typeof error === "object" &&
				error !== null &&
				"response" in error &&
				typeof error.response === "object" &&
				error.response !== null &&
				"data" in error.response &&
				typeof error.response.data === "object" &&
				error.response.data !== null &&
				"message" in error.response.data
			) {
				setError(String(error.response.data.message));
				return;
			}

			setError("Unable to create account.");
		},
	});

	return (
		<main className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border/70 bg-background/82 shadow-[0_30px_80px_-56px_rgba(20,30,70,0.62)] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
			<section className="relative overflow-hidden border-b border-border/60 p-7 sm:p-10 lg:border-r lg:border-b-0">
				<div className="pointer-events-none absolute -top-10 right-8 h-44 w-44 rounded-full bg-violet-400/22 blur-3xl" />
				<div className="pointer-events-none absolute bottom-2 left-4 h-36 w-36 rounded-full bg-sky-400/14 blur-3xl" />
				<div className="relative space-y-6">
					<Badge variant="outline" className="w-fit">
						<Rocket className="size-3.5" />
						New workspace
					</Badge>
					<div className="space-y-3">
						<p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
							LAUNCH YOUR PROFILE
						</p>
						<h1 className="text-4xl leading-[0.96] sm:text-5xl">
							Create your public developer presence in one studio.
						</h1>
						<p className="max-w-md text-sm text-muted-foreground sm:text-base">
							Your username becomes your starting portfolio URL. You can publish safely,
							iterate in drafts, and export resume PDFs when ready.
						</p>
					</div>
					<div className="space-y-3">
						{[
							"One workspace for portfolio and resume content",
							"Version-based publishing to avoid breaking your live page",
							"Professional output tuned for recruiter readability",
						].map((item) => (
							<div
								key={item}
								className="rounded-2xl border border-border/70 bg-muted/45 px-4 py-3 text-sm text-muted-foreground"
							>
								{item}
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="p-7 sm:p-10">
				<div className="mx-auto w-full max-w-xl space-y-6">
					<div>
						<h2 className="text-3xl leading-tight sm:text-4xl">Create your account</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Set your core details now. You can edit profile data and URL slug later.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="fullName">Full name</Label>
							<Input
								id="fullName"
								type="text"
								placeholder="Maria Angela Santos"
								value={form.fullName}
								onChange={(event) =>
									setForm((current) => ({
										...current,
										fullName: event.target.value,
									}))
								}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								placeholder="maria-santos-dev"
								value={form.username}
								onChange={(event) =>
									setForm((current) => ({
										...current,
										username: event.target.value,
									}))
								}
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={form.email}
							onChange={(event) =>
								setForm((current) => ({
									...current,
									email: event.target.value,
								}))
							}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="At least 8 characters"
							value={form.password}
							onChange={(event) =>
								setForm((current) => ({
									...current,
									password: event.target.value,
								}))
							}
						/>
					</div>

					{error ? (
						<div className="rounded-2xl border border-destructive/35 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
							{error}
						</div>
					) : null}

					<Button
						type="button"
						onClick={() => {
							setError("");
							signupMutation.mutate();
						}}
						disabled={signupMutation.isPending}
						className="w-full"
						size="lg"
					>
						{signupMutation.isPending ? "Creating..." : "Create workspace"}
						<ArrowRight className="size-4" />
					</Button>

					<p className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link to="/login" className="font-medium text-foreground underline underline-offset-4">
							Log in
						</Link>
					</p>
				</div>
			</section>
		</main>
	);
}
