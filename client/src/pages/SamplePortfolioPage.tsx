import Home from "@/pages/Home";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";

export default function SamplePortfolioPage() {
	return (
		<>
			<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
				<div className="text-xs uppercase tracking-[0.2em] text-(--app-subtle)">
					Sample Portfolio
				</div>
				<div className="flex flex-wrap gap-2">
					<Link to="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
						Back to landing
					</Link>
					<Link to="/signup" className={buttonVariants({ size: "sm" })}>
						Create account
					</Link>
					<Link to="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
						Log in
					</Link>
				</div>
			</div>
			<Home />
		</>
	);
}
