import { getTechIcon } from "@/lib/tech";
import { samplePortfolio } from "../../../../shared/defaults/portfolio";
import type { TechCategory } from "../../../../shared/types/portfolio.types";

export default function TechStack({ categories }: { categories?: TechCategory[] }) {
	const techCategories = categories ?? samplePortfolio.techCategories;

	return (
		<div className="space-y-3 sm:space-y-4">
			<div className="text-base sm:text-lg font-bold">Tech Stack</div>
			{techCategories.map((category, index) => (
				<div key={category.id || `${category.name}-${index}`}>
					<div className="space-y-1">
						<div className="font-medium">{category.name}</div>
						<div className="flex gap-2 flex-wrap">
							{category.items.map((item, itemIndex) => {
								const tech = getTechIcon(item);

								return (
									<div
										key={`${category.id || category.name}-${item}-${itemIndex}`}
										className="app-chip flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 cursor-pointer"
									>
										{tech && <tech.Icon className={tech.className} />}
										<div className="text-sm">{item}</div>
									</div>
								);
							})}
						</div>
					</div>

					{index < techCategories.length - 1 && (
						<div className="h-px bg-(--app-border) my-1" />
					)}
				</div>
			))}
		</div>
	);
}
