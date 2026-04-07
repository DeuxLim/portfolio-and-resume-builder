import { Outlet, Link, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api, apiBaseUrl } from "@/lib/axios.client";
import { sessionQueryKey } from "@/hooks/useSession";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { useSession } from "@/hooks/useSession";
import { Menu, X } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export default function AppLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const sessionQuery = useSession();
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const isAuthed = Boolean(sessionQuery.data?.user);
	const username =
		sessionQuery.data?.portfolioSlug ?? sessionQuery.data?.user?.username;
	const publicPortfolioPath = username ? `/${username}` : "";
	const resumePdfHref = `${apiBaseUrl}/resumes/me/pdf`;
	const resumePdfDownloadHref = `${apiBaseUrl}/resumes/me/pdf?download=1`;
	const publicResumePdfHref = username
		? `${apiBaseUrl}/resumes/${encodeURIComponent(username)}/pdf?download=1`
		: "";
	const logoutMutation = useMutation({
		mutationFn: async () => api.post("/auth/logout"),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: sessionQueryKey });
			navigate("/");
		},
	});

	const navActiveClass =
		"bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/35 dark:text-emerald-300";
	const isDashboardActive = location.pathname === "/dashboard";
	const isEditorActive =
		location.pathname.startsWith("/dashboard/edit") ||
		location.pathname.startsWith("/dashboard/create");
	const isResumeBuilderActive = location.pathname.startsWith("/dashboard/resume");
	const isHomeActive = location.pathname === "/";
	const isSampleActive = location.pathname.startsWith("/sample");
	const isGuideActive = location.pathname.startsWith("/guide");

	return (
		<div className="app-shell relative min-h-dvh bg-[radial-gradient(circle_at_top_right,#0ea5e91f,transparent_40%),radial-gradient(circle_at_top_left,#22c55e14,transparent_35%)] bg-cover bg-center">
			<div className="pointer-events-none absolute inset-0 opacity-70">
				<div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
				<div className="absolute top-24 -right-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-6xl px-3 pt-3 pb-8 sm:px-4 sm:pt-5 sm:pb-10 md:pt-6">
				<header className="mb-5 rounded-2xl border border-border/70 bg-background/80 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/65 sm:p-4">
					<div className="flex items-center gap-2 sm:gap-3">
						<Link
							to="/"
							className="inline-flex min-w-0 flex-1 items-center rounded-lg bg-muted/45 px-3 py-2 text-[11px] font-semibold tracking-[0.08em] text-foreground/90 transition-colors hover:bg-muted/60 sm:text-xs"
						>
							<span className="truncate">Resume-style Web Dev Portfolio Generator</span>
						</Link>
						<div className="md:hidden">
							<ThemeToggleButton />
						</div>
						<Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
							<SheetTrigger
								render={
									<Button
										type="button"
										size="sm"
										variant="ghost"
										className="md:hidden"
										aria-label={
											mobileNavOpen
												? "Close navigation menu"
												: "Open navigation menu"
										}
									/>
								}
							>
								{mobileNavOpen ? <X className="size-4" /> : <Menu className="size-4" />}
							</SheetTrigger>
							<SheetContent side="left" className="w-full max-w-sm p-0 md:hidden">
								<SheetHeader className="sr-only">
									<SheetTitle>Mobile navigation</SheetTitle>
									<SheetDescription>Primary site navigation for mobile devices.</SheetDescription>
								</SheetHeader>
								<nav
									id="mobile-top-nav"
									aria-label="Mobile primary"
									className="mt-0 space-y-2 bg-background p-3"
								>
									{isAuthed ? (
										<>
											<Link
												to="/dashboard"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
													isDashboardActive && navActiveClass,
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												Dashboard
											</Link>
											<Link
												to="/guide"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
													isGuideActive && navActiveClass,
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												User guide
											</Link>
											<div className="px-2 pt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
												Portfolio
											</div>
											<Link
												to="/dashboard/edit"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
													isEditorActive && navActiveClass,
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												Edit portfolio
											</Link>
											<Link
												to="/dashboard?newVersion=1"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												New version
											</Link>
											{publicPortfolioPath ? (
												<Link
													to={publicPortfolioPath}
													target="_blank"
													rel="noopener noreferrer"
													className={cn(
														buttonVariants({ size: "sm", variant: "ghost" }),
														"w-full justify-start",
													)}
													onClick={() => setMobileNavOpen(false)}
												>
													My portfolio
												</Link>
											) : null}
											<div className="px-2 pt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
												Resume
											</div>
											<Link
												to="/dashboard/resume"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
													isResumeBuilderActive && navActiveClass,
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												Open resume builder
											</Link>
											<a
												href={resumePdfHref}
												target="_blank"
												rel="noopener noreferrer"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												Preview PDF
											</a>
											<a
												href={resumePdfDownloadHref}
												target="_blank"
												rel="noopener noreferrer"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												Download PDF
											</a>
											{publicResumePdfHref ? (
												<a
													href={publicResumePdfHref}
													target="_blank"
													rel="noopener noreferrer"
													className={cn(
														buttonVariants({ size: "sm", variant: "ghost" }),
														"w-full justify-start",
													)}
													onClick={() => setMobileNavOpen(false)}
												>
													Public resume PDF
												</a>
											) : null}
											<Button
												type="button"
												size="sm"
												variant="ghost"
												className="w-full justify-start"
												onClick={() => {
													setMobileNavOpen(false);
													logoutMutation.mutate();
												}}
												disabled={logoutMutation.isPending}
											>
												{logoutMutation.isPending ? "Logging out..." : "Log out"}
											</Button>
										</>
									) : (
										<>
											<Link
												to="/"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
													isHomeActive && navActiveClass,
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												Home
											</Link>
											<Link
												to="/sample"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
													isSampleActive && navActiveClass,
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												Sample output
											</Link>
											<Link
												to="/guide"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
													isGuideActive && navActiveClass,
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												User guide
											</Link>
											<Link
												to="/login"
												className={cn(
													buttonVariants({ size: "sm", variant: "ghost" }),
													"w-full justify-start",
												)}
												onClick={() => setMobileNavOpen(false)}
											>
												Log in
											</Link>
											<Link
												to="/signup"
												className={cn(buttonVariants({ size: "sm" }), "w-full justify-start")}
												onClick={() => setMobileNavOpen(false)}
											>
												Create account
											</Link>
										</>
									)}
								</nav>
							</SheetContent>
						</Sheet>
					</div>

					<div className="mt-3 hidden items-center justify-between gap-2 md:flex">
						{isAuthed ? (
							<nav aria-label="Primary" className="flex flex-wrap items-center gap-1.5">
								<Link
									to="/dashboard"
									className={cn(
										buttonVariants({ size: "sm", variant: "ghost" }),
										isDashboardActive && navActiveClass,
									)}
								>
									Dashboard
								</Link>
								<Link
									to="/guide"
									className={cn(
										buttonVariants({ size: "sm", variant: "ghost" }),
										isGuideActive && navActiveClass,
									)}
								>
									User guide
								</Link>

								<DropdownMenu>
									<DropdownMenuTrigger
										className={cn(
											buttonVariants({ size: "sm", variant: "ghost" }),
											"cursor-pointer",
											isEditorActive && navActiveClass,
										)}
									>
										Portfolio builder
									</DropdownMenuTrigger>
									<DropdownMenuContent className="min-w-52">
										<DropdownMenuItem
											render={<Link to="/dashboard/edit" />}
											className={isEditorActive ? navActiveClass : undefined}
										>
											Edit portfolio
										</DropdownMenuItem>
										<DropdownMenuItem render={<Link to="/dashboard?newVersion=1" />}>
											New version
										</DropdownMenuItem>
										{publicPortfolioPath ? (
											<DropdownMenuItem
												render={
													<Link
														to={publicPortfolioPath}
														target="_blank"
														rel="noopener noreferrer"
													/>
												}
												className={location.pathname === publicPortfolioPath ? navActiveClass : undefined}
											>
												My portfolio
											</DropdownMenuItem>
										) : null}
									</DropdownMenuContent>
								</DropdownMenu>

								<DropdownMenu>
									<DropdownMenuTrigger
										className={cn(
											buttonVariants({ size: "sm", variant: "ghost" }),
											"cursor-pointer",
											isResumeBuilderActive && navActiveClass,
										)}
									>
										Resume builder
									</DropdownMenuTrigger>
									<DropdownMenuContent className="min-w-52">
										<DropdownMenuItem
											render={<Link to="/dashboard/resume" />}
											className={isResumeBuilderActive ? navActiveClass : undefined}
										>
											Open resume builder
										</DropdownMenuItem>
										<DropdownMenuItem
											render={
												<a href={resumePdfHref} target="_blank" rel="noopener noreferrer" />
											}
										>
											Preview PDF
										</DropdownMenuItem>
										<DropdownMenuItem
											render={
												<a
													href={resumePdfDownloadHref}
													target="_blank"
													rel="noopener noreferrer"
												/>
											}
										>
											Download PDF
										</DropdownMenuItem>
										{publicResumePdfHref ? (
											<DropdownMenuItem
												render={
													<a
														href={publicResumePdfHref}
														target="_blank"
														rel="noopener noreferrer"
													/>
												}
											>
												Public resume PDF
											</DropdownMenuItem>
										) : null}
									</DropdownMenuContent>
								</DropdownMenu>
								<Button
									type="button"
									size="sm"
									variant="ghost"
									onClick={() => logoutMutation.mutate()}
									disabled={logoutMutation.isPending}
								>
									{logoutMutation.isPending ? "Logging out..." : "Log out"}
								</Button>
							</nav>
						) : (
							<nav aria-label="Primary" className="flex flex-wrap items-center gap-6 px-1">
								<Link
									to="/"
									className={cn(
										"text-[1.04rem] font-semibold tracking-tight text-foreground/82 transition-colors hover:text-foreground",
										isHomeActive && "text-foreground",
									)}
								>
									Home
								</Link>
								<Link
									to="/sample"
									className={cn(
										"text-[1.04rem] font-semibold tracking-tight text-foreground/82 transition-colors hover:text-foreground",
										isSampleActive && "text-foreground",
									)}
								>
									Sample output
								</Link>
								<Link
									to="/guide"
									className={cn(
										"text-[1.04rem] font-semibold tracking-tight text-foreground/82 transition-colors hover:text-foreground",
										isGuideActive && "text-foreground",
									)}
								>
									User guide
								</Link>
								<Link
									to="/login"
									className="text-[1.04rem] font-semibold tracking-tight text-foreground/82 transition-colors hover:text-foreground"
								>
									Log in
								</Link>
								<Link
									to="/signup"
									className={cn(
										buttonVariants({ size: "sm" }),
										"rounded-2xl px-4 text-[1.02rem] font-semibold",
									)}
								>
									Create account
								</Link>
							</nav>
						)}
						<ThemeToggleButton />
					</div>

				</header>

				<Outlet />
			</div>
		</div>
	);
}
