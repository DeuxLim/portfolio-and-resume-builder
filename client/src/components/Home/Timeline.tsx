import { samplePortfolio } from "../../../../shared/defaults/portfolio";
import type { TimelineItem } from "../../../../shared/types/portfolio.types";

export default function Timeline({ items }: { items?: TimelineItem[] }) {
	const timeline = items ?? samplePortfolio.timeline;

	return (
		<div className="space-y-4">
			<div className="text-base sm:text-lg font-bold">Timeline</div>
			<div className="font-sans">
				<div className="flex flex-col gap-2">
					{timeline.map((exp, index) => (
						<div
							key={exp.id || `${exp.year}-${exp.position}`}
							className="flex flex-row items-start gap-2.5"
						>
							{/* Dot + Line */}
							<div className="flex flex-col items-center w-3.5 shrink-0 self-stretch">
								<div
									className={`w-2 h-2 shrink-0 mt-0.5 ${
										index === 0
											? "bg-(--app-text)"
											: "bg-(--app-border)"
									}`}
								/>
								{index < timeline.length - 1 && (
									<div className="w-px flex-1 bg-(--app-border) mt-1" />
								)}
							</div>

							{/* Content */}
							<div className="pb-7 flex-1 min-w-0">
								{/* Position + Year */}
								<div className="flex items-start justify-between gap-2">
									<span className="text-sm font-semibold leading-none flex-1 min-w-0">
										{exp.position}
									</span>
									<span className="text-xs text-(--app-muted) tracking-wide leading-none shrink-0">
										{exp.year}
									</span>
								</div>

								{/* Company + Honor */}
								{(exp.company || exp.note) && (
									<div className="text-xs text-(--app-muted) mt-1 flex items-start gap-2">
										<div className="flex-1 min-w-0">
											{exp.note && (
												<span>{exp.note} · </span>
											)}
											<span>{exp.company}</span>
										</div>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
