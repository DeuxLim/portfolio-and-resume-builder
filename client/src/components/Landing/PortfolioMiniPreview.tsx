import PortfolioView from "@/components/portfolio/PortfolioView";
import { samplePortfolio } from "../../../../shared/defaults/portfolio";

export default function PortfolioMiniPreview() {
	return (
		<div className="overflow-hidden rounded-xl border bg-background/95">
			<div className="flex items-center gap-1.5 border-b bg-muted/40 px-3 py-2">
				<div className="size-2 rounded-full bg-rose-400" />
				<div className="size-2 rounded-full bg-amber-400" />
				<div className="size-2 rounded-full bg-emerald-400" />
				<div className="ml-2 text-[10px] text-muted-foreground">portfolio preview</div>
			</div>
			<div className="relative h-72 overflow-hidden bg-muted/20">
				<div className="pointer-events-none absolute left-0 top-0 origin-top-left scale-[0.3] sm:scale-[0.34]">
					<div className="w-[1100px] p-3">
						<PortfolioView portfolio={samplePortfolio} />
					</div>
				</div>
			</div>
		</div>
	);
}
