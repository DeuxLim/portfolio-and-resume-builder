import { Outlet } from "react-router";

export default function PortfolioLayout() {
	return (
		<div className="app-shell min-h-dvh bg-cover bg-center">
			<div className="mx-auto max-w-4xl px-3 pt-5 sm:px-4 sm:pt-6 md:pt-8">
				<Outlet />
			</div>
		</div>
	);
}
