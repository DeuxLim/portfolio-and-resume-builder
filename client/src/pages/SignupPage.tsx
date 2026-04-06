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
import { Rocket } from "lucide-react";

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
		<main className="mx-auto grid max-w-5xl gap-4 sm:gap-6 lg:grid-cols-[1fr_1.1fr]">
			<Card className="order-2 bg-gradient-to-br from-violet-500/10 via-sky-500/8 to-transparent shadow-none lg:order-1">
				<CardHeader className="space-y-3">
					<Badge variant="secondary" className="w-fit">
						<Rocket className="mr-1 size-3.5" />
						Start Fast
					</Badge>
					<CardTitle className="text-2xl">Create your developer portfolio</CardTitle>
					<CardDescription>
						Your username is your starting URL. You can change the public URL anytime.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<div className="rounded-lg bg-muted/35 px-3 py-2">
						Reserve your profile link.
					</div>
					<div className="rounded-lg bg-muted/35 px-3 py-2">
						Use the guided editor flow.
					</div>
					<div className="rounded-lg bg-muted/35 px-3 py-2">
						Manage versions without breaking your live page.
					</div>
				</CardContent>
			</Card>

			<Card className="order-1 shadow-none lg:order-2">
				<CardHeader className="space-y-3">
					<Badge variant="secondary" className="w-fit">
						Create Account
					</Badge>
					<CardTitle className="text-2xl sm:text-3xl">Get started</CardTitle>
					<CardDescription>
						Fill out your basics and publish your first version.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-5">
					<div className="space-y-3 rounded-xl bg-muted/20 p-4">
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
								signupMutation.mutate();
							}}
							disabled={signupMutation.isPending}
							className="w-full"
						>
							{signupMutation.isPending ? "Creating..." : "Create account"}
						</Button>
					</div>

					<Separator />
					<div className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link to="/login" className="font-medium text-foreground underline">
							Log in
						</Link>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
