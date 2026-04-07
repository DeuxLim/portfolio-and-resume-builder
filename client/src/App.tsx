import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@/context/Theme/ThemeProvider";
import routes from "@/routes";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<RouterProvider router={routes} />
				<Toaster position="top-right" richColors />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
