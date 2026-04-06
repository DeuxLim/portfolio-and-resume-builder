import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react";

type UsePinnedSidebarOptions = {
	enabled: boolean;
	topOffset?: number;
	minWidth?: number;
	defaultWidth?: number;
};

type UsePinnedSidebarResult = {
	isPinned: boolean;
	shellRef: RefObject<HTMLDivElement | null>;
	asideRef: RefObject<HTMLElement | null>;
	pinnedStyle: CSSProperties | undefined;
};

export const usePinnedSidebar = ({
	enabled,
	topOffset = 96,
	minWidth = 768,
	defaultWidth = 220,
}: UsePinnedSidebarOptions): UsePinnedSidebarResult => {
	const [isPinned, setIsPinned] = useState(false);
	const [left, setLeft] = useState(0);
	const [width, setWidth] = useState(defaultWidth);
	const shellRef = useRef<HTMLDivElement | null>(null);
	const asideRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const syncPinnedSidebar = () => {
			if (!enabled || window.innerWidth < minWidth) {
				setIsPinned(false);
				return;
			}

			const shell = shellRef.current;
			const aside = asideRef.current;
			if (!shell || !aside) {
				setIsPinned(false);
				return;
			}

			const shellRect = shell.getBoundingClientRect();
			const asideRect = aside.getBoundingClientRect();
			setLeft(asideRect.left);
			setWidth(asideRect.width || defaultWidth);
			setIsPinned(shellRect.top <= topOffset);
		};

		syncPinnedSidebar();
		window.addEventListener("scroll", syncPinnedSidebar, { passive: true });
		window.addEventListener("resize", syncPinnedSidebar);
		return () => {
			window.removeEventListener("scroll", syncPinnedSidebar);
			window.removeEventListener("resize", syncPinnedSidebar);
		};
	}, [defaultWidth, enabled, minWidth, topOffset]);

	const pinnedStyle = useMemo<CSSProperties | undefined>(
		() =>
			isPinned
				? {
						position: "fixed",
						top: `${topOffset}px`,
						left: `${left}px`,
						width: `${width}px`,
						zIndex: 20,
				  }
				: undefined,
		[isPinned, left, topOffset, width],
	);

	return {
		isPinned,
		shellRef,
		asideRef,
		pinnedStyle,
	};
};
