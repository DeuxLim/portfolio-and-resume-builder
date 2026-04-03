import { samplePortfolio } from "../../../../shared/defaults/portfolio";
import type { ExperienceItem } from "../../../../shared/types/portfolio.types";

export default function Experience({
	items,
}: {
	items?: ExperienceItem[];
}) {
	const experiences = items ?? samplePortfolio.experiences;
	// Build a flat list of lines with their content and line numbers
	const lines: { content: React.ReactNode }[] = [];

	experiences.forEach((exp, i) => {
		const fnName =
			exp.role.replace(/[^a-zA-Z0-9]+/g, " ").trim().replace(/\s+/g, "") ||
			"Experience";

		// comment line
		lines.push({
			content: (
				<span className="text-(--app-subtle) text-[11px] sm:text-xs">
					{`// ${String(i + 1).padStart(2, "0")} — ${exp.company} · ${exp.period}`}
				</span>
			),
		});
		// function declaration
		lines.push({
			content: (
				<span className="text-xs sm:text-[13px]">
					<span className="text-(--app-subtle)">function </span>
					<span className="font-semibold text-(--app-text)">
						{fnName}
					</span>
					<span className="text-(--app-subtle)">() {"{"}</span>
				</span>
			),
		});
		// highlights
		exp.highlights.forEach((item) => {
			lines.push({
				content: (
					<span className="flex gap-2 pl-4 text-[11.5px] sm:text-[12.5px] leading-snug">
						<span className="text-(--app-subtle) shrink-0">›</span>
						<span className="text-(--app-muted)">{item}</span>
					</span>
				),
			});
		});
		// closing brace
		lines.push({
			content: (
				<span className="text-(--app-subtle) text-xs sm:text-[13px]">
					{"}"}
				</span>
			),
		});
		// spacer (empty line between entries)
		if (i < experiences.length - 1) {
			lines.push({ content: null });
		}
	});

	return (
		<div className="space-y-3">
			{/* Filename bar */}
			<div className="flex items-center gap-2 border-b border-(--app-border) pb-2">
				<span className="text-base sm:text-lg font-bold">
					Experience
				</span>
			</div>

			{/* Lines */}
			<div className="flex flex-col font-mono">
				{lines.map((line, i) => (
					<div
						key={i}
						className="grid grid-cols-[24px_1fr] sm:grid-cols-[28px_1fr] gap-x-2.5 sm:gap-x-3 min-h-5 group"
					>
						<span className="text-[10px] text-right text-(--app-subtle) opacity-40 group-hover:opacity-70 select-none pt-px">
							{line.content !== null ? i + 1 : ""}
						</span>
						<span className="leading-relaxed">{line.content}</span>
					</div>
				))}
			</div>
		</div>
	);
}
