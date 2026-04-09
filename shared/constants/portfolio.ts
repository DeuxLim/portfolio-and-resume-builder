export const PORTFOLIO_EXPERIENCE_SUMMARY_MAX_LENGTH = 90;

export const clampPortfolioExperienceSummary = (value: string) =>
	String(value ?? "").slice(0, PORTFOLIO_EXPERIENCE_SUMMARY_MAX_LENGTH);

export const truncatePortfolioExperienceSummaryForDisplay = (value: string) => {
	const normalized = String(value ?? "").trim();
	if (normalized.length <= PORTFOLIO_EXPERIENCE_SUMMARY_MAX_LENGTH) {
		return normalized;
	}
	return `${normalized
		.slice(0, PORTFOLIO_EXPERIENCE_SUMMARY_MAX_LENGTH - 1)
		.trimEnd()}…`;
};
