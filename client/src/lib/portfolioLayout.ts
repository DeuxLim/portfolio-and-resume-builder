import { defaultPortfolioLayout } from "../../../shared/defaults/portfolio";
import type {
	EditablePortfolio,
	PortfolioSectionKey,
	PortfolioSectionSpan,
	PublicPortfolio,
} from "../../../shared/types/portfolio.types";

type PortfolioLike = Pick<PublicPortfolio, "layout" | "customSections"> | null | undefined;

export const PORTFOLIO_LAYOUT_ROW_HEIGHT = 26;
export const PORTFOLIO_LAYOUT_GAP = 16;

const hasCustomSections = (portfolio: PortfolioLike): boolean =>
	Boolean(portfolio?.customSections?.length);

export const isSectionVisibleInPortfolio = (
	sectionKey: PortfolioSectionKey,
	portfolio: PortfolioLike,
): boolean => {
	if (sectionKey === "custom") {
		return hasCustomSections(portfolio);
	}
	return true;
};

export const getVisibleSectionOrder = (
	portfolio: PortfolioLike,
): PortfolioSectionKey[] => {
	const rawOrder = portfolio?.layout?.sectionOrder?.length
		? portfolio.layout.sectionOrder
		: defaultPortfolioLayout.sectionOrder;

	return rawOrder
		.filter((key, index, arr) => arr.indexOf(key) === index)
		.filter((key) => isSectionVisibleInPortfolio(key, portfolio));
};

export const getVisibleHiddenSections = (
	portfolio: Pick<EditablePortfolio, "layout" | "customSections">,
): PortfolioSectionKey[] => {
	const visibleOrder = new Set(getVisibleSectionOrder(portfolio));
	return defaultPortfolioLayout.sectionOrder
		.filter((section) => isSectionVisibleInPortfolio(section, portfolio))
		.filter((section) => !visibleOrder.has(section));
};

export type PackedSectionLayout = Record<
	PortfolioSectionKey,
	{ x: number; y: number; w: PortfolioSectionSpan; h: number }
>;

const intersects = (
	a: { x: number; y: number; w: number; h: number },
	b: { x: number; y: number; w: number; h: number },
) =>
	a.x < b.x + b.w &&
	a.x + a.w > b.x &&
	a.y < b.y + b.h &&
	a.y + a.h > b.y;

export const packSectionLayout = ({
	order,
	spans,
	heights,
	positions,
	cols = 12,
}: {
	order: PortfolioSectionKey[];
	spans: Record<PortfolioSectionKey, PortfolioSectionSpan>;
	heights: Record<PortfolioSectionKey, number>;
	positions: Record<PortfolioSectionKey, { x: number; y: number }>;
	cols?: number;
}): PackedSectionLayout => {
	const placed: Array<{ key: PortfolioSectionKey; x: number; y: number; w: number; h: number }> = [];
	const result = {} as PackedSectionLayout;

	const sorted = [...order].sort((a, b) => {
		const ay = positions[a]?.y ?? 0;
		const by = positions[b]?.y ?? 0;
		if (ay !== by) return ay - by;
		const ax = positions[a]?.x ?? 0;
		const bx = positions[b]?.x ?? 0;
		return ax - bx;
	});

	for (const key of sorted) {
		const w = spans[key];
		const h = heights[key];
		const maxX = Math.max(0, cols - w);
		let x = Math.max(0, Math.min(maxX, Math.round(positions[key]?.x ?? 0)));
		let y = Math.max(0, Math.round(positions[key]?.y ?? 0));
		let moved = true;

		while (moved) {
			moved = false;
			for (const entry of placed) {
				if (intersects({ x, y, w, h }, entry)) {
					y = entry.y + entry.h;
					moved = true;
				}
			}
		}

		placed.push({ key, x, y, w, h });
		result[key] = { x, y, w, h };
	}

	return result;
};
