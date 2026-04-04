const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL ?? "");

const getApiOrigin = () => {
	if (!API_BASE_URL) {
		return "";
	}

	try {
		return new URL(API_BASE_URL).origin;
	} catch {
		return "";
	}
};

export const resolveAssetUrl = (value: string) => {
	const trimmed = value.trim();

	if (!trimmed) {
		return "";
	}

	if (/^https?:\/\//i.test(trimmed) || /^data:/i.test(trimmed)) {
		return trimmed;
	}

	if (trimmed.startsWith("/")) {
		// Only backend-served assets should be prefixed with the API origin.
		// Default assets live in the frontend `public/` folder (same origin as the SPA).
		if (trimmed.startsWith("/uploads/")) {
			const origin = getApiOrigin();
			return origin ? `${origin}${trimmed}` : trimmed;
		}

		return trimmed;
	}

	return trimmed;
};

export const getDefaultAvatarUrl = () => "/default-avatar.svg";

export const getAvatarUrl = (value?: string) => {
	const resolved = resolveAssetUrl(String(value ?? ""));
	return resolved || getDefaultAvatarUrl();
};
