import { samplePortfolio } from "../../../../shared/defaults/portfolio";

export default function Footer({ fullName }: { fullName?: string }) {
	const name = fullName ?? samplePortfolio.fullName;

	return (
		<div>
			<div className="text-sm font-light">
				© {new Date().getFullYear()} {name}. All rights reserved.
			</div>
		</div>
	);
}
