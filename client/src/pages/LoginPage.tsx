import { api } from "@/lib/axios.client";
import { sessionQueryKey } from "@/hooks/useSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lock, Sparkles } from "lucide-react";

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
		<main className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.1fr]">
			<Card className="bg-gradient-to-br from-sky-500/12 via-emerald-500/8 to-transparent shadow-none">
				<CardHeader className="space-y-3">
					<Badge variant="secondary" className="w-fit">
						<Lock className="mr-1 size-3.5" />
						Welcome Back
					</Badge>
					<CardTitle className="text-2xl">Pick up where you left off</CardTitle>
					<CardDescription>
						Open your dashboard, edit your content, and publish updates in minutes.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<div className="rounded-lg bg-muted/35 px-3 py-2">
						One active public portfolio link.
					</div>
					<div className="rounded-lg bg-muted/35 px-3 py-2">
						Multiple draft versions.
					</div>
					<div className="rounded-lg bg-muted/35 px-3 py-2">
						Clean, recruiter-ready output.
					</div>
				</CardContent>
			</Card>

			<Card className="shadow-none">
				<CardHeader className="space-y-3">
					<Badge variant="secondary" className="w-fit">
						<Sparkles className="mr-1 size-3.5" />
						Account Login
					</Badge>
					<CardTitle className="text-2xl sm:text-3xl">Log in</CardTitle>
					<CardDescription>Continue editing your developer portfolio.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-5">
					<div className="space-y-3 rounded-xl bg-muted/20 p-4">
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

					{error && (
						<div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
							{error}
						</div>
					)}

					<div className="rounded-xl bg-background/80 p-4">
						<Button
							type="button"
							onClick={() => {
								setError("");
								loginMutation.mutate();
							}}
							disabled={loginMutation.isPending}
							className="w-full"
						>
							{loginMutation.isPending ? "Logging in..." : "Log in"}
						</Button>
					</div>

					<Separator />
					<div className="text-sm text-muted-foreground">
						New here?{" "}
						<Link to="/signup" className="font-medium text-foreground underline">
							Create your account
						</Link>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
