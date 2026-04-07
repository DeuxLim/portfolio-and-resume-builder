import useTheme from "@/context/Theme/useTheme";
import { useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { Button } from "@/components/ui/button";

export default function ThemeToggleButton() {
	const { isDarkMode, toggleTheme } = useTheme();

	const [isAnimating, setIsAnimating] = useState(false);

	const handleToggle = () => {
		setIsAnimating(true);
		toggleTheme();

		setTimeout(() => {
			setIsAnimating(false);
		}, 500);
	};

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
			className="bg-background/80"
			onClick={handleToggle}
		>
			{isDarkMode ? (
				<IoMdSunny
					className={`text-(--app-accent) ${
						isAnimating ? "motion-safe:animate-spin" : ""
					}`}
				/>
			) : (
				<IoMdMoon className="text-(--app-accent)" />
			)}
		</Button>
	);
}
