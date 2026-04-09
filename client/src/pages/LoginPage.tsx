import { api } from "@/lib/axios.client";
import { sessionQueryKey } from "@/hooks/useSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

export default function LoginPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const loginMutation = useMutation({
		mutationFn: async () => {
			const { data } = await api.post("/auth/login", form);
			return data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: sessionQueryKey });
			navigate("/dashboard");
		},
		onError: () => setError("Invalid email or password."),
	});

	return (
		<main className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border/70 bg-background/82 shadow-[0_28px_80px_-58px_rgba(20,30,70,0.62)] lg:grid lg:grid-cols-[1.02fr_0.98fr]">
			<section className="relative overflow-hidden border-b border-border/60 p-7 sm:p-10 lg:border-b-0 lg:border-r">
				<div className="pointer-events-none absolute -top-12 right-8 h-44 w-44 rounded-full bg-indigo-400/18 blur-3xl" />
				<div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-sky-400/12 blur-3xl" />
				<div className="relative space-y-6">
					<Badge variant="outline" className="w-fit">
						<Lock className="size-3.5" />
						Welcome back
					</Badge>
					<div className="space-y-3">
						<p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
							STUDIO ACCESS
						</p>
						<h1 className="text-4xl leading-[0.96] sm:text-5xl">
							Return to your portfolio workspace.
						</h1>
						<p className="max-w-md text-sm text-muted-foreground sm:text-base">
							Pick up draft versions, keep your live page stable, and ship polished updates
							when you are ready.
						</p>
					</div>
					<div className="space-y-3">
						{[
							"Keep one live version while editing safely in drafts",
							"Open your resume builder and export ATS-friendly PDF output",
							"Manage publishing and content from one source of truth",
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
				<div className="mx-auto w-full max-w-md space-y-6">
					<Badge variant="secondary" className="w-fit">
						<Sparkles className="size-3.5" />
						Sign in
					</Badge>
					<div>
						<h2 className="text-3xl leading-tight sm:text-4xl">Log in to continue</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Open your dashboard and continue editing where you left off.
						</p>
					</div>

					<div className="space-y-4">
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
								placeholder="Enter your password"
								value={form.password}
								onChange={(event) =>
									setForm((current) => ({
										...current,
										password: event.target.value,
									}))
								}
							/>
						</div>
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
							loginMutation.mutate();
						}}
						disabled={loginMutation.isPending}
						className="w-full"
						size="lg"
					>
						{loginMutation.isPending ? "Logging in..." : "Enter workspace"}
						<ArrowRight className="size-4" />
					</Button>

					<p className="text-sm text-muted-foreground">
						No account yet?{" "}
						<Link to="/signup" className="font-medium text-foreground underline underline-offset-4">
							Create one
						</Link>
					</p>
				</div>
			</section>
		</main>
	);
}
