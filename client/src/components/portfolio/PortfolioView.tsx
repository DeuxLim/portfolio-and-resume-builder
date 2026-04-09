import Header from "@/components/Home/Header";
import Content from "@/components/Home/Content";
import type { PublicPortfolio } from "../../../../shared/types/portfolio.types";

export default function PortfolioView({
	portfolio,
}: {
	portfolio: PublicPortfolio;
}) {
	return (
		<main className="generated-output flex flex-col gap-3 sm:gap-4">
			<Header portfolio={portfolio} />
			<Content portfolio={portfolio} />
		</main>
	);
}
