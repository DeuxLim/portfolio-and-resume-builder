import { samplePortfolio } from "../../../../shared/defaults/portfolio";

export default function About({ paragraphs }: { paragraphs?: string[] }) {
	const items = paragraphs ?? samplePortfolio.about;

	return (
		<div className="space-y-4">
			<div className="text-base sm:text-lg font-bold">About</div>
			<div className="text-[13px] sm:text-sm font-light space-y-3">
				{items.map((paragraph, index) => (
					<p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
				))}
			</div>
		</div>
	);
}
